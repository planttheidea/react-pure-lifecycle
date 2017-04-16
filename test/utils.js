// test
import test from 'ava';
import isFunction from 'lodash/isFunction';
import React, {
  Component,
  PureComponent
} from 'react';
import sinon from 'sinon';

// src
import * as utils from 'src/utils';

test('if createSingleLifecycleMethodDecorator returns a function', (t) => {
  const result = utils.createSingleLifecycleMethodDecorator();

  t.true(isFunction(result));
});

test('if createSingleLifecycleMethodDecorator will throw an error when run without a function parameter', (t) => {
  const result = utils.createSingleLifecycleMethodDecorator();

  t.throws(() => {
    result();
  });
});

test('if createSingleLifecycleMethodDecorator returns an addHooks result', (t) => {
  const method = 'foo';
  const addHooks = (object) => {
    return object;
  };
  const fn = sinon.stub();

  const decorator = utils.createSingleLifecycleMethodDecorator(method, addHooks);
  const result = decorator(fn);

  t.deepEqual(result, {
    [method]: fn,
    isPure: undefined
  });

  result[method]();

  t.true(fn.calledOnce);
});

test('if createSingleLifecycleMethodDecorator returns an addHooks result with isPure set correctly', (t) => {
  const method = 'foo';
  const addHooks = (object) => {
    return object;
  };
  const fn = sinon.stub();
  const isPure = true;

  const decorator = utils.createSingleLifecycleMethodDecorator(method, addHooks);
  const result = decorator(fn, isPure);

  t.deepEqual(result, {
    [method]: fn,
    isPure
  });

  result[method]();

  t.true(fn.calledOnce);
});

test('if getInvalidMethodWarning will get the right warning message for a lifecycle method', (t) => {
  const methodName = 'componentDidMount';

  const result = utils.getInvalidMethodWarning(methodName);

  t.regex(result, /not a function/);
});

test('if getInvalidMethodWarning will get the right warning message for a non-lifecycle method', (t) => {
  const methodName = 'foo';

  const result = utils.getInvalidMethodWarning(methodName);

  t.regex(result, /not a valid lifecycle method/);
});

test.serial('if isReactClass will call isPrototypeOf on the React classes', (t) => {
  const ComponentStub = sinon.stub(React.Component, 'isPrototypeOf');
  const PureComponentStub = sinon.stub(React.PureComponent, 'isPrototypeOf');

  const Foo = () => {
    return (
      <div/>
    );
  };

  utils.isReactClass(Foo);

  t.true(ComponentStub.calledOnce);
  t.true(ComponentStub.calledWith(Foo));

  t.true(PureComponentStub.calledOnce);
  t.true(PureComponentStub.calledWith(Foo));

  ComponentStub.restore();
  PureComponentStub.restore();
});

test.serial('if isReactClass will check if the item passed has Component or PureComponent as an ancestor', (t) => {
  const Functional = () => {
    return (
      <div/>
    );
  };

  t.false(utils.isReactClass(Functional));

  class Standard extends Component {
    render() {
      return (
        <div/>
      );
    }
  }

  t.true(utils.isReactClass(Standard));

  class Pure extends PureComponent {
    render() {
      return (
        <div/>
      );
    }
  }

  t.true(utils.isReactClass(Pure));
});

test('if isValidLifecycleMethodName checks the object for the methodName', (t) => {
  const validMethodName = 'componentDidMount';
  const invalidMethodName = 'foo';

  t.true(utils.isValidLifecycleMethodName(validMethodName));
  t.false(utils.isValidLifecycleMethodName(invalidMethodName));
});

test('if setLifecycleMethods will only add the method when the item is a valid key from LIFECYCLE_METHODS, ' +
  'otherwise fires a warning', (t) => {
  const invalidMethod = 'foo';
  const validMethod = 'componentDidMount';

  const invalidStub = sinon.stub();
  const validStub = sinon.stub();

  const invalidComponent = {};
  const validComponent = {};

  const stub = sinon.stub(global.console, 'warn');

  const invalidResult = utils.setLifecycleMethods(invalidComponent, {
    [invalidMethod]: invalidStub
  });
  const invalidExpectedResult = {};

  t.deepEqual(invalidResult, invalidExpectedResult);
  t.true(stub.calledOnce);

  stub.restore();

  const validResult = utils.setLifecycleMethods(validComponent, {
    [validMethod]: validStub
  });

  t.true(validResult.hasOwnProperty(validMethod));
  t.true(isFunction(validResult[validMethod]));
});

test('if setLifecycleMethods will fire a warning to the console if the method is valid but is not a function', (t) => {
  const method = 'componentDidUpdate';
  const value = 'foo';

  const stub = sinon.stub(global.console, 'warn');

  utils.setLifecycleMethods(method, {
    [method]: value
  });

  t.true(stub.calledOnce);

  stub.restore();
});
