import test from 'ava';
import React, {
  Component
} from 'react';
import sinon from 'sinon';
import {
  mount
} from 'enzyme';

import {
  getClassHoc,
  getFunctionHoc
} from 'src/components';

import {
  LIFECYCLE_METHODS
} from 'src/constants';

const FunctionalComponent = ({counter}) => {
  return (
    <div>
      {counter}
    </div>
  );
};

class ClassComponent extends Component {
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

  const options = LIFECYCLE_METHODS.reduce((stubs, key) => {
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
  testIfLifecycleHookAdded(t, getFunctionHoc, FunctionalComponent);
});

test('if getClassHoc will add a lifecycle hook to the component passed', (t) => {
  testIfLifecycleHookAdded(t, getClassHoc, ClassComponent);
});

test('if getFunctionHoc will add all lifecycle hooks and fire in order', (t) => {
  testIfLifecycleHooksFireInOrder(t, getFunctionHoc, FunctionalComponent);
});

test('if getClassHoc will add all lifecycle hooks and fire in order', (t) => {
  testIfLifecycleHooksFireInOrder(t, getClassHoc, ClassComponent);
});