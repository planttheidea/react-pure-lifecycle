// test
import test from 'ava';
import {
  mount,
  shallow
} from 'enzyme';
import toJson from 'enzyme-to-json';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import React from 'react';
import sinon from 'sinon';

import addLifecycleMethods, {
  componentWillMount,
  componentDidMount,
  componentWillReceiveProps,
  shouldComponentUpdate,
  componentWillUpdate,
  componentDidUpdate,
  componentWillUnmount
} from 'src/index';

const FunctionalComponent = ({counter}) => <div>{counter}</div>;

FunctionalComponent.propTypes = {
  counter: PropTypes.number,
};

class ClassComponent extends React.Component {
  static propTypes = {
    counter: PropTypes.number,
  };

  render() {
    const {counter} = this.props;

    return <div>{counter}</div>;
  }
}

test('if addLifecycleMethods returns a function', (t) => {
  const result = addLifecycleMethods();

  t.true(isFunction(result));
});

test('if addLifecycleMethods throws when passed a non-object for methods', (t) => {
  t.throws(() => {
    addLifecycleMethods('foo');
  });
});

test('if addLifecycleMethods throws when passed a non-object for options', (t) => {
  t.throws(() => {
    addLifecycleMethods({}, 'foo');
  });
});

test('if addLifecycleMethods returns an HOC of the component passed', (t) => {
  const result = addLifecycleMethods()(FunctionalComponent);

  t.true(isFunction(result));
});

test('if addLifecycleMethods returns the correct HOC based on the component type passed', (t) => {
  const functionalResult = addLifecycleMethods()(FunctionalComponent);
  const impureFunctionalResult = addLifecycleMethods(undefined, {usePureComponent: false})(FunctionalComponent);
  const classResult = addLifecycleMethods()(ClassComponent);

  t.is(Object.getPrototypeOf(functionalResult), React.PureComponent);
  t.is(Object.getPrototypeOf(impureFunctionalResult), React.Component);
  t.is(Object.getPrototypeOf(classResult), ClassComponent);
});

test('if componentWillMount-specific decorator will fire', (t) => {
  const stub = sinon.stub();
  const decorator = componentWillMount(stub);

  const DecoratedComponent = decorator(FunctionalComponent);

  mount(<DecoratedComponent />);

  t.true(stub.calledOnce);
});

test('if componentDidMount-specific decorator will fire', (t) => {
  const stub = sinon.stub();
  const decorator = componentDidMount(stub);

  const DecoratedComponent = decorator(FunctionalComponent);

  mount(<DecoratedComponent />);

  t.true(stub.calledOnce);
});

test('if componentWillReceiveProps-specific decorator will fire', (t) => {
  const stub = sinon.stub();
  const decorator = componentWillReceiveProps(stub);

  const DecoratedComponent = decorator(FunctionalComponent);

  const wrapper = mount(<DecoratedComponent />);

  t.false(stub.called);

  wrapper.setProps({
    counter: 1,
  });

  t.true(stub.calledOnce);
});

test('if shouldComponentUpdate-specific decorator will fire', (t) => {
  const stub = sinon.stub();
  const decorator = shouldComponentUpdate(stub, {usePureComponent: false});

  stub.returns(true);

  const DecoratedComponent = decorator(FunctionalComponent);

  const wrapper = mount(<DecoratedComponent />);

  t.false(stub.called);

  wrapper.setProps({
    counter: 1,
  });

  t.true(stub.calledOnce);
});

test('if componentWillUpdate-specific decorator will fire', (t) => {
  const stub = sinon.stub();
  const decorator = componentWillUpdate(stub);

  const DecoratedComponent = decorator(FunctionalComponent);

  const wrapper = mount(<DecoratedComponent />);

  t.false(stub.called);

  wrapper.setProps({
    counter: 1,
  });

  t.true(stub.calledOnce);
});

test('if componentDidUpdate-specific decorator will fire', (t) => {
  const stub = sinon.stub();
  const decorator = componentDidUpdate(stub);

  const DecoratedComponent = decorator(FunctionalComponent);

  const wrapper = mount(<DecoratedComponent />);

  t.false(stub.called);

  wrapper.setProps({
    counter: 1,
  });

  t.true(stub.calledOnce);
});

test('if componentWillUnmount-specific decorator will fire', (t) => {
  const stub = sinon.stub();
  const decorator = componentWillUnmount(stub);

  const DecoratedComponent = decorator(FunctionalComponent);

  const wrapper = mount(<DecoratedComponent />);

  t.false(stub.called);

  wrapper.setProps({
    counter: 1,
  });

  t.false(stub.called);

  wrapper.unmount();

  t.true(stub.calledOnce);
});

test('if snapshots work as expected', (t) => {
  const onMount = ({doThing}) => doThing();
  const spy = sinon.spy();

  const DummyComponent = componentDidMount(onMount)(FunctionalComponent);

  const wrapper = shallow(<DummyComponent doThing={spy} />);

  t.true(spy.calledOnce);

  t.snapshot(toJson(wrapper));
});
