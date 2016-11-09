// external dependencies
import isPlainObject from 'lodash/isPlainObject';
import React, {
  Component
} from 'react';

// utils
import {
  getClassHoc,
  getFunctionHoc
} from './components';
import {
  createSingleLifecycleMethodDecorator
} from './utils';

// constants
import {
  LIFECYCLE_METHODS
} from './constants';

/**
 * add the lifecycle hooks to the component and return it
 *
 * @param {object} options={}
 * @returns {function(Component): Component}
 */
const addLifecycleHooks = (options = {}) => {
  if (!isPlainObject(options)) {
    throw new TypeError('Options passed must be a plain object.');
  }

  return (PassedComponent) => {
    if (Component.isPrototypeOf(PassedComponent)) {
      return getClassHoc(PassedComponent, options);
    }

    return getFunctionHoc(PassedComponent, options);
  };
};

const {
  componentWillMount,
  componentDidMount,
  componentWillReceiveProps,
  shouldComponentUpdate,
  componentWillUpdate,
  componentDidUpdate,
  componentWillUnmount
} = LIFECYCLE_METHODS.reduce((exportsObject, method) => {
  return {
    ...exportsObject,
    [method]: createSingleLifecycleMethodDecorator(method, addLifecycleHooks)
  };
}, {});

export {componentWillMount};
export {componentDidMount};
export {componentWillReceiveProps};
export {shouldComponentUpdate};
export {componentWillUpdate};
export {componentDidUpdate};
export {componentWillUnmount};

export default addLifecycleHooks;
