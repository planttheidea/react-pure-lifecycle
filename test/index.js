import test from 'ava';
import {
  mount
} from 'enzyme';
import isFunction from 'lodash/isFunction';
import React from 'react';
import sinon from 'sinon';

import addLifecycleHooks, {
  componentWillMount,
  componentDidMount,
  componentWillReceiveProps,
  shouldComponentUpdate,
  componentWillUpdate,
  componentDidUpdate,
  componentWillUnmount
} from 'src/index';

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

class ClassComponent extends React.Component {
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

test('if addLifecycleHooks returns a function', (t) => {
  const result = addLifecycleHooks();

  t.true(isFunction(result));
});

test('if addLifecycleHooks throws when passed a non-object', (t) => {
  t.throws(() => {
    addLifecycleHooks('foo');
  });
});

test('if addLifecycleHooks returns an HOC of the component passed', (t) => {
  const result = addLifecycleHooks()(FunctionalComponent);

  t.true(isFunction(result));
});

test('if addLifecycleHooks returns the correct HOC based on the component type passed', (t) => {
  const functionalResult = addLifecycleHooks()(FunctionalComponent);
  const classResult = addLifecycleHooks()(ClassComponent);

  t.is(Object.getPrototypeOf(functionalResult), React.Component);
  t.is(Object.getPrototypeOf(classResult), ClassComponent);
});

test('if componentWillMount-specific decorator will fire', (t) => {
  const stub = sinon.stub();
  const decorator = componentWillMount(stub);

  const DecoratedComponent = decorator(FunctionalComponent);

  mount(<DecoratedComponent/>);

  t.true(stub.calledOnce);
});

test('if componentDidMount-specific decorator will fire', (t) => {
  const stub = sinon.stub();
  const decorator = componentDidMount(stub);

  const DecoratedComponent = decorator(FunctionalComponent);

  mount(<DecoratedComponent/>);

  t.true(stub.calledOnce);
});

test('if componentWillReceiveProps-specific decorator will fire', (t) => {
  const stub = sinon.stub();
  const decorator = componentWillReceiveProps(stub);

  const DecoratedComponent = decorator(FunctionalComponent);

  const wrapper = mount(<DecoratedComponent/>);

  t.false(stub.called);

  wrapper.setProps({
    counter: 1
  });

  t.true(stub.calledOnce);
});

test('if shouldComponentUpdate-specific decorator will fire', (t) => {
  const stub = sinon.stub();
  const decorator = shouldComponentUpdate(stub);

  stub.returns(true);

  const DecoratedComponent = decorator(FunctionalComponent);

  const wrapper = mount(<DecoratedComponent/>);

  t.false(stub.called);

  wrapper.setProps({
    counter: 1
  });

  t.true(stub.calledOnce);
});

test('if componentWillUpdate-specific decorator will fire', (t) => {
  const stub = sinon.stub();
  const decorator = componentWillUpdate(stub);

  const DecoratedComponent = decorator(FunctionalComponent);

  const wrapper = mount(<DecoratedComponent/>);

  t.false(stub.called);

  wrapper.setProps({
    counter: 1
  });

  t.true(stub.calledOnce);
});

test('if componentDidUpdate-specific decorator will fire', (t) => {
  const stub = sinon.stub();
  const decorator = componentDidUpdate(stub);

  const DecoratedComponent = decorator(FunctionalComponent);

  const wrapper = mount(<DecoratedComponent/>);

  t.false(stub.called);

  wrapper.setProps({
    counter: 1
  });

  t.true(stub.calledOnce);
});

test('if componentWillUnmount-specific decorator will fire', (t) => {
  const stub = sinon.stub();
  const decorator = componentWillUnmount(stub);

  const DecoratedComponent = decorator(FunctionalComponent);

  const wrapper = mount(<DecoratedComponent/>);

  t.false(stub.called);

  wrapper.setProps({
    counter: 1
  });

  t.false(stub.called);

  wrapper.unmount();

  t.true(stub.calledOnce);
});
