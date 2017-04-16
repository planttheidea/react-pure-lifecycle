// test
import test from 'ava';
import PropTypes from 'prop-types';
import React, {
  Component,
  PureComponent
} from 'react';
import sinon from 'sinon';
import {
  mount
} from 'enzyme';

// src
import * as components from 'src/components';
import {
  LIFECYCLE_METHODS
} from 'src/constants';

const Functional = ({counter}) => {
  return (
    <div>
      {counter}
    </div>
  );
};

Functional.propTypes = {
  counter: PropTypes.number
};

class Standard extends Component {
  static propTypes = {
    counter: PropTypes.number
  };

  render() {
    const {
      counter
    } = this.props;

    return (
      <div>
        {counter}
      </div>
    );
  }
}

class Pure extends PureComponent {
  static propTypes = {
    counter: PropTypes.number
  };

  render() {
    const {
      counter
    } = this.props;

    return (
      <div>
        {counter}
      </div>
    );
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
  const options = {
    componentDidMount
  };

  const ComponentWithHooks = method(ComponentToTest, options);

  mount(<ComponentWithHooks/>);

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

  const options = Object.keys(LIFECYCLE_METHODS).reduce((stubs, key) => {
    return {
      ...stubs,
      [key]() {
        passed.push(key);

        return true;
      }
    };
  }, {});

  const ComponentWithHooks = method(ComponentToTest, options);

  const wrapper = mount(<ComponentWithHooks/>);

  const expectedMountResult = [
    'componentWillMount',
    'componentDidMount'
  ];

  t.deepEqual(passed, expectedMountResult);

  wrapper.setProps({
    counter: 1
  });

  const expectedUpdateResult = [
    ...expectedMountResult,
    'componentWillReceiveProps',
    'shouldComponentUpdate',
    'componentWillUpdate',
    'componentDidUpdate'
  ];

  t.deepEqual(passed, expectedUpdateResult);

  wrapper.unmount();

  t.deepEqual(passed, [
    ...expectedUpdateResult,
    'componentWillUnmount'
  ]);
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

test('if getFunctionHoc will add all lifecycle hooks and fire in order', (t) => {
  testIfLifecycleHooksFireInOrder(t, components.getFunctionHoc, Functional);
});

test('if getClassHoc will add all lifecycle hooks and fire in order', (t) => {
  testIfLifecycleHooksFireInOrder(t, components.getClassHoc, Standard);
});

test('if getClassHoc will add all lifecycle hooks and fire in order', (t) => {
  testIfLifecycleHooksFireInOrder(t, components.getClassHoc, Pure);
});

test('if getFunctionHoc will extend a standard class when isPure is false', (t) => {
  const methods = {
    componentDidUpdate() {}
  };
  const isPure = false;

  const Result = components.getFunctionHoc(Functional, methods, isPure);

  t.true(Component.isPrototypeOf(Result));
  t.false(PureComponent.isPrototypeOf(Result));
});

test('if getFunctionHoc will extend a pure class when isPure is true', (t) => {
  const methods = {
    componentDidUpdate() {}
  };
  const isPure = true;

  const Result = components.getFunctionHoc(Functional, methods, isPure);

  t.false(Component.isPrototypeOf(Result));
  t.true(PureComponent.isPrototypeOf(Result));
});
