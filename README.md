# react-pure-lifecycle

Add lifecycle methods to your functional components with purity

<img src="https://img.shields.io/badge/build-passing-brightgreen.svg"/>
<img src="https://img.shields.io/badge/coverage-100%25-brightgreen.svg"/>
<img src="https://img.shields.io/badge/license-MIT-blue.svg"/>

#### Installation

    $ npm i react-pure-lifecycle --save
    
#### Usage

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

In addition to functional components, you can use this on a standard React class:

```javascript
import React, {
    Component
} from 'react';
import lifecycle from 'react-pure-lifecycle';

const componentDidUpdate = (props, previousProps) => {
    console.log('I mounted! Here are my props: ', props);
};

const methods = {
    componentDidMount
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

Not a whole lot of gain here other than the fact that you now have a pure function that you can test independently (no need to create an instance).

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

#### Development

Standard stuff, clone the repo and `npm install` dependencies. The npm scripts available:
* `build` => run webpack to build crio.js with NODE_ENV=development
* `build:minifed` => run webpack to build crio.min.js with NODE_ENV=production
* `clean` => run `rimraf` on both `lib` and `dist`
* `lint` => run ESLint against all files in the `src` folder
* `prepublish` => runs `prepubish:compile`
* `prepublish:compile` => run `clean`, `lint`, `test`, `transpile`, `build`, and `build-minified`
* `start` => run webpack dev server to run example app (playground!)
* `test` => run AVA test functions with `NODE_ENV=test`
* `test:coverage` => run `test` with nyc to get output of code coverage
* `test:watch` => same as `test`, but runs persistent watcher
* `transpile` => run babel against all files in `src` to create files in `lib`
