# react-pure-lifecycle

Add lifecycle methods to your functional components with purity

<img src="https://img.shields.io/badge/build-passing-brightgreen.svg"/>
<img src="https://img.shields.io/badge/coverage-100%25-brightgreen.svg"/>
<img src="https://img.shields.io/badge/license-MIT-blue.svg"/>

### Table of contents
* [Installation](#installation)
* [Usage](#usage)
  * [Functional components](#functional-components)
  * [Class components](#class-components)
* [Making functional components pure](#making-functional-components-pure)
* [Development](#development)

### Installation

```
$ npm i react-pure-lifecycle --save
```

### Usage

The primary use case for this decorator is with functional components, however you can use it with `Component` and `PureComponent` classes as well.

#### Functional components

```javascript
import React from 'react';
import lifecycle from 'react-pure-lifecycle';

// create your lifecycle methods
const componentDidMount = (props) => {
  console.log('I mounted! Here are my props: ', props);
};

// make them properties on a standard object
const methods = {
  componentDidMount
};

const FunctionalComponent = ({children}) => {
  return (
    <div>
      {children}
    </div>
  );
};

// decorate the component
export default lifecycle(methods)(FunctionalComponent);
```

The complete list of lifecycle methods are supported, minus `constructor` (if you want to fire something as early as possible, use `componentWillMount`). The first parameter passed to each lifecycle method is the component's current `props`, and then all standard parameters for that given lifecycle method follow. For a detailed explanation of each of the methods and the parameters they expect, [check the React documentation](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle).

#### Class components

```javascript
import React, {
  Component
} from 'react';
import lifecycle from 'react-pure-lifecycle';

const componentDidUpdate = (props, previousProps) => {
  console.log('I updated! Here are my current and previous props: ', props, previousProps);
};

const methods = {
  componentDidUpdate
};

@lifecycle(methods)
class ComponentClass extends Component {
  render() {
    const {
      children
    } = this.props;

    return (
      <div>
        {children}
      </div>
    );
  }
}
```

Not a whole lot of gain here other than the fact that you now have a pure function that you can test independently (no need to create an instance). This decoration method will also work on `PureComponent`s.

Finally, each lifecycle method is also provided as their own decorator, if you just want to bind a single method (receives the method itself instead of an object of methods):

```javascript
import React from 'react';
import {
  shouldComponentUpdate
} from 'react-pure-lifecycle';

const onlyUpdateIfChanged = (props, nextProps) => {
  return props.children !== nextProps.children;
};

const FunctionalComponent = ({children}) => {
  return (
    <div>
      {children}
    </div>
  );
};

// decorate the component
export default shouldComponentUpdate(onlyUpdateIfChanged)(FunctionalComponent);
```

### Making functional components pure

In addition to the methods passed, you can pass the `isPure` option, and functional components will have the same shallow-compare test that `PureComponent` has:

```javascript
import React from 'react';
import lifecycle from 'react-pure-lifecycle';

const options = {
  componentDidMount(props) {
    console.log('Mounted with props: ', props)
  },
  isPure: true
};

const Foo = () => {
  return (
    <div>
      Hello!
    </div>
  );
};

export defailt lifecycle(options)(Foo);
```

This will also apply if you pass `true` as the second parameter to any of the lifecycle-specific decorators:

```javascript
import React from 'react';
import {
  componentDidMount
} from 'react-pure-lifecycle';

const fn = (props) => {
  console.log('Mounted with props: ', props)
};

const Foo = () => {
  return (
    <div>
      Hello!
    </div>
  );
};

export defailt componentDidMount(fn, true)(Foo);
```

### Development

Standard stuff, clone the repo and `npm install` dependencies. The npm scripts available:
* `build` => run webpack to build unminified JS with `NODE_ENV` set to `development` and source map
* `build:minifed` => run webpack to build minified JS with `NODE_ENV` set to `production`
* `clean` => run `rimraf` on both `lib` and `dist`
* `lint` => run ESLint against all files in the `src` folder
* `prepublish` => runs `prepubish:compile`
* `prepublish:compile` => run `clean`, `lint`, `test`, `transpile`, `build`, and `build-minified`
* `start` => run webpack dev server to run example app (playground!)
* `test` => run AVA test functions with `NODE_ENV=test`
* `test:coverage` => run `test` with nyc to get output of code coverage
* `test:watch` => run `test`, but with persistent watcher
* `transpile` => run babel against all files in `src` to create files in `lib`
