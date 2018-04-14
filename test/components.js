// test
import test from 'ava';
import PropTypes from 'prop-types';
import React, {Component, PureComponent} from 'react';
import sinon from 'sinon';
import {mount} from 'enzyme';

// src
import * as components from 'src/components';
import {DEFAULT_OPTIONS, LIFECYCLE_METHODS} from 'src/constants';

const MODERN_LIFECYCLE_METHODS = Object.keys(LIFECYCLE_METHODS).reduce(
  (methods, key) => (LIFECYCLE_METHODS[`UNSAFE_${key}`] ? methods : methods.concat([key])),
  []
);

const Functional = ({counter}) => <div>{counter}</div>;

Functional.propTypes = {
  counter: PropTypes.number
};

class Standard extends Component {
  static propTypes = {
    counter: PropTypes.number
  };

  render() {
    const {counter} = this.props;

    return <div>{counter}</div>;
  }
}

class Pure extends PureComponent {
  static propTypes = {
    counter: PropTypes.number
  };

  render() {
    const {counter} = this.props;

    return <div>{counter}</div>;
  }
}

/**
 * test if the lifecycle method was added to the component
 *
 * @param {Object} t
 * @param {function} method
 * @param {Component} ComponentToTest
 */
const testIfLifecycleHookAdded = (t, method, ComponentToTest) => {
  const componentDidMount = sinon.stub();
  const methods = {
    componentDidMount
  };

  const ComponentWithHooks = method(ComponentToTest, methods, DEFAULT_OPTIONS);

  mount(<ComponentWithHooks />);

  t.true(componentDidMount.calledOnce);
};

/**
 * test if all the methods are added and fired in order
 *
 * @param {Object} t
 * @param {function} method
 * @param {Component} ComponentToTest
 */
const testIfLifecycleHooksFireInOrder = (t, method, ComponentToTest) => {
  let passed = [];

  const methods = MODERN_LIFECYCLE_METHODS.reduce((stubs, key) => {
    if (key === 'getSnapshotBeforeUpdate') {
      return stubs;
    }

    return {
      ...stubs,
      [key]() {
        passed.push(key);

        return true;
      }
    };
  }, {});

  delete methods.getChildContext;

  const ComponentWithHooks = method(ComponentToTest, methods, {
    ...DEFAULT_OPTIONS,
    usePureComponent: false
  });

  const wrapper = mount(<ComponentWithHooks />);

  const expectedMountResult = ['UNSAFE_componentWillMount', 'componentDidMount'];

  t.deepEqual(passed, expectedMountResult);

  wrapper.setProps({
    counter: 1
  });

  const expectedUpdateResult = [
    ...expectedMountResult,
    'UNSAFE_componentWillReceiveProps',
    'shouldComponentUpdate',
    'UNSAFE_componentWillUpdate',
    'componentDidUpdate'
  ];

  t.deepEqual(passed, expectedUpdateResult);

  wrapper.unmount();

  t.deepEqual(passed, [...expectedUpdateResult, 'componentWillUnmount']);
};

test('if getFunctionHoc will add a lifecycle hook to the component passed', (t) => {
  testIfLifecycleHookAdded(t, components.getFunctionHoc, Functional);
});

test('if getClassHoc will add a lifecycle hook to the component passed', (t) => {
  testIfLifecycleHookAdded(t, components.getClassHoc, Standard);
});

test('if getClassHoc will add a lifecycle hook to the pure component passed', (t) => {
  testIfLifecycleHookAdded(t, components.getClassHoc, Pure);
});

test('if getFunctionHoc will add all lifecycle hooks and fire in order for a functional component', (t) => {
  testIfLifecycleHooksFireInOrder(t, components.getFunctionHoc, Functional);
});

test('if getClassHoc will add all lifecycle hooks and fire in order for a standard component', (t) => {
  testIfLifecycleHooksFireInOrder(t, components.getClassHoc, Standard);
});

test('if getClassHoc will add all lifecycle hooks and fire in order for a pure component', (t) => {
  testIfLifecycleHooksFireInOrder(t, components.getClassHoc, Pure);
});

test('if getFunctionHoc will extend a standard class when isPure is false', (t) => {
  const methods = {
    componentDidUpdate() {}
  };
  const options = {
    ...DEFAULT_OPTIONS,
    usePureComponent: false
  };

  const Result = components.getFunctionHoc(Functional, methods, options);

  t.true(Component.isPrototypeOf(Result));
  t.false(PureComponent.isPrototypeOf(Result));
});

test('if getFunctionHoc will extend a pure class when isPure is true', (t) => {
  const methods = {
    componentDidUpdate() {}
  };

  const Result = components.getFunctionHoc(Functional, methods, DEFAULT_OPTIONS);

  t.false(Component.isPrototypeOf(Result));
  t.true(PureComponent.isPrototypeOf(Result));
});

test('if getFunctionHoc will remove childContextTypes from the fn if it exists', (t) => {
  const methods = {
    getChildContext() {
      return {
        foo: 'bar'
      };
    }
  };

  const FunctionalWithChildContext = ({counter}) => <div>{counter}</div>;

  FunctionalWithChildContext.propTypes = {
    counter: PropTypes.number
  };

  const childContextTypes = {
    foo: PropTypes.string
  };

  FunctionalWithChildContext.childContextTypes = childContextTypes;

  const Result = components.getFunctionHoc(FunctionalWithChildContext, methods, DEFAULT_OPTIONS);

  t.deepEqual(Result.childContextTypes, childContextTypes);
  t.is(FunctionalWithChildContext.childContextTypes, undefined);
});
