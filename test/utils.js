// test
import test from 'ava';
import _ from 'lodash';
import React, {Component, PureComponent} from 'react';
import sinon from 'sinon';

// src
import * as utils from 'src/utils';
import {DEFAULT_OPTIONS} from 'src/constants';

test('if createSingleLifecycleMethodDecorator returns a function', (t) => {
  const result = utils.createSingleLifecycleMethodDecorator();

  t.true(_.isFunction(result));
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

  t.true(_.isFunction(decorator));

  const result = decorator(fn);

  t.deepEqual(result, {
    [method]: fn
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

  const decorator = utils.createSingleLifecycleMethodDecorator(method, addHooks);

  t.true(_.isFunction(decorator));

  const result = decorator(fn, DEFAULT_OPTIONS);

  t.deepEqual(result, {
    [method]: fn
  });

  result[method]();

  t.true(fn.calledOnce);
});

test('if getComponentDisplayName will get the function name when displayName is provided', (t) => {
  const displayName = 'foo';
  const fn = function bar() {};

  fn.displayName = displayName;

  const result = utils.getComponentDisplayName(fn);

  t.is(result, `PureLifecycle(${displayName})`);
});

test('if getComponentDisplayName will get the function name when displayName is not provided', (t) => {
  const displayName = undefined;
  const fn = function bar() {};

  fn.displayName = displayName;

  const result = utils.getComponentDisplayName(fn);

  t.is(result, `PureLifecycle(${fn.name})`);
});

test('if getComponentDisplayName will provide a fallback when function name is unable to be determined', (t) => {
  const result = utils.getComponentDisplayName(() => {});

  t.is(result, `PureLifecycle(Component)`);
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

test.serial('if isReactClass will check if the item passed has Component or PureComponent as an ancestor', (t) => {
  const Functional = () => {
    return <div />;
  };

  t.false(utils.isReactClass(Functional));

  class Standard extends Component {
    render() {
      return <div />;
    }
  }

  t.true(utils.isReactClass(Standard));

  class Pure extends PureComponent {
    render() {
      return <div />;
    }
  }

  t.true(utils.isReactClass(Pure));
});

test(
  'if setLifecycleMethods will only add the method when the item is a valid key from LIFECYCLE_METHODS, ' +
    'otherwise fires a warning',
  (t) => {
    const invalidComponent = {};
    const invalidMethod = 'foo';
    const validMethod = 'componentDidMount';

    const validComponent = {};
    const invalidStub = sinon.stub();
    const validStub = sinon.stub();

    const stub = sinon.stub(global.console, 'warn');

    const invalidResult = utils.setLifecycleMethods(
      invalidComponent,
      {
        [invalidMethod]: invalidStub
      },
      DEFAULT_OPTIONS.injectProps
    );
    const invalidExpectedResult = {};

    t.deepEqual(invalidResult, invalidExpectedResult);
    t.true(stub.calledOnce);

    stub.restore();

    const validResult = utils.setLifecycleMethods(
      validComponent,
      {
        [validMethod]: validStub
      },
      DEFAULT_OPTIONS.injectProps
    );

    t.true(validResult.hasOwnProperty(validMethod));
    t.true(_.isFunction(validResult[validMethod]));
  }
);

test('if setLifecycleMethods will fire a warning to the console if the method is valid but is not a function', (t) => {
  const component = {};
  const method = 'componentDidUpdate';
  const value = 'foo';

  const stub = sinon.stub(global.console, 'warn');

  utils.setLifecycleMethods(
    component,
    {
      [method]: value
    },
    DEFAULT_OPTIONS.injectProps
  );

  t.true(stub.calledOnce);

  stub.restore();
});

test('if setLifecycleMethods will add the method directly instead of a wrapper if injectProps is false', (t) => {
  const component = {};
  const method = 'componentDidMount';
  const value = sinon.spy();

  utils.setLifecycleMethods(
    component,
    {
      [method]: value
    },
    false
  );

  t.is(component[method], value);
});

test('if setLifecycleMethods will add the wrapper method if injectProps is false', (t) => {
  const component = {
    props: {}
  };
  const method = 'componentDidMount';
  const value = sinon.spy();

  utils.setLifecycleMethods(
    component,
    {
      [method]: value
    },
    true
  );

  t.not(component[method], value);

  const otherProps = {};

  component[method](otherProps);

  t.true(value.calledOnce);
  t.true(value.calledWith(component.props, otherProps));
});
