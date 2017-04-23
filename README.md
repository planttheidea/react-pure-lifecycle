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
  * [Individual method decorators](#individual-method-decorators)
  * [Adding child context](#adding-child-context)
* [Options](#options)
  * [injectProps](#injectprops)
  * [usePureComponent](#usepurecomponent)
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

You can also add options to customize the use of the decorator, see [Options](#options) for more details.

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

#### Individual method decorators

Each lifecycle method is also provided as their own decorator, if you just want to bind a single method (receives the method itself instead of an object of methods):

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

If you want to provide options to these specific method decorators, you can pass them as the second argument.

#### Adding child context

In addition to providing the standard lifecycle methods, starting in `2.x.x` you can add child context to functional components (something normally `React` disallows). Example:

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import lifecycle from 'react-pure-lifecycle';

const methods = {
  getChildContext(props) {
    return {
      foo: 'bar'
    };
  }
};

const Foo = () => {
  return (
    <div>
      Hello!
    </div>
  );
};

Foo.childContextTypes = {
  foo: PropTypes.string.isRequired
};

export default lifecycle(methods, options)(Foo);
```

Like standard lifecycle methods, this will also apply to components instantiated via the class method, with the only difference from standard behavior being the injection of the `props` argument.

### Options

Additional options can be passed as the second parameter to the decorator, with the following shape:

```javascript
{
  injectProps: boolean, // should the component's props be injected as first argument (default: true)
  usePureComponent: boolean // should the component rendered be a PureComponent (default: true)
}
```

#### injectProps

By default, all lifecycle methods will receive the component's current `props` as the first argument, and then all standard arguments for the given lifecycle method following. If you would like to disable this injection, set `injectProps` to `false`:

```javascript
import React from 'react';
import lifecycle from 'react-pure-lifecycle';

const methods = {
  componentDidUpdate(previousProps) {
    console.log('Normally the first argument would be the currentProps,' previousProps);
  }
};
const options = {
  injectProps: false
};

const Foo = () => {
  return (
    <div>
      Hello!
    </div>
  );
};

export default lifecycle(methods, options)(Foo);
```

#### usePureComponent

By default, functional components that have the decorator applied will use `PureComponent` as the foundation of the HOC, allowing for the same render-limiting performance optimizations that a `PureComponent` class has. If you would like to disable this and instead use the standard `Component` class for the HOC, set `usePureComponent` to `false`.

```javascript
import React from 'react';
import lifecycle from 'react-pure-lifecycle';

const methods = {
  componentDidMount(props) {
    console.log('Mounted with props: ', props)
  }
};
const options = {
  usePureComponent: false
};

const Foo = () => {
  return (
    <div>
      Hello!
    </div>
  );
};

export default lifecycle(methods, options)(Foo);
```

Please note that this option will only affect functional components; if you apply the decorator to a standard component class, it will use the same component class that was decorated.

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
