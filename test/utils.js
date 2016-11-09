import test from 'ava';
import isFunction from 'lodash/isFunction';
import sinon from 'sinon';

import {
  createSingleLifecycleMethodDecorator,
  setLifecycleMethods
} from 'src/utils';

import {
  LIFECYCLE_METHODS
} from 'src/constants';

test('if createSingleLifecycleMethodDecorator returns a function', (t) => {
  const result = createSingleLifecycleMethodDecorator();

  t.true(isFunction(result));
});

test('if createSingleLifecycleMethodDecorator will throw an error when run without a function parameter', (t) => {
  const result = createSingleLifecycleMethodDecorator();

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

  const decorator = createSingleLifecycleMethodDecorator(method, addHooks);
  const result = decorator(fn);

  t.deepEqual(result, {
    [method]: fn
  });

  result[method]();

  t.true(fn.calledOnce);
});

test('if setLifecycleMethods will only add the method when the item is a valid key from LIFECYCLE_METHODS', (t) => {
  const invalidMethod = 'foo';
  const validMethod = 'componentDidMount';

  const invalidStub = sinon.stub();
  const validStub = sinon.stub();

  const invalidComponent = {};
  const validComponent = {};

  const invalidResult = setLifecycleMethods(invalidComponent, {
    [invalidMethod]: invalidStub
  });
  const invalidExpectedResult = {};

  t.deepEqual(invalidResult, invalidExpectedResult);

  const validResult = setLifecycleMethods(validComponent, {
    [validMethod]: validStub
  });

  t.true(validResult.hasOwnProperty(validMethod));
  t.true(isFunction(validResult[validMethod]));
});

test('if setLifecycleMethods will fire a warning to the console if the method is valid but is not a function', (t) => {
  const method = 'componentDidUpdate';
  const value = 'foo';

  const stub = sinon.stub(global.console, 'warn');

  setLifecycleMethods(method, {
    [method]: value
  });

  t.true(stub.calledOnce);

  stub.restore();
});