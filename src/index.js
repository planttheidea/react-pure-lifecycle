// external dependencies
import React from 'react';

//components
import {
  getClassHoc,
  getFunctionHoc
} from './components';

// constants
import {
  DEFAULT_OPTIONS,
  LIFECYCLE_METHODS
} from './constants';

// utils
import {
  createSingleLifecycleMethodDecorator,
  isPlainObject,
  isReactClass
} from './utils';

/**
 * @function addLifecycleMethods
 *
 * @description
 * add the lifecycle hooks to the component and return it
 *
 * @param {Object} [methods={}] the methods passed
 * @param {Object} [optionsPassed={}] the options passed
 * @returns {function(PassedComponent: ReactComponent): ReactComponent} the component augmented with lifecycle methods
 */
const addLifecycleMethods = (methods = {}, optionsPassed = {}) => {
  if (!isPlainObject(methods)) {
    throw new TypeError('Methods passed must be in the form of a plain object.');
  }

  if (!isPlainObject(optionsPassed)) {
    throw new TypeError('Options passed must be in the form of a plain object.');
  }

  return (PassedComponent) => {
    const getHoc = isReactClass(PassedComponent) ? getClassHoc : getFunctionHoc;

    return getHoc(PassedComponent, methods, {
      ...DEFAULT_OPTIONS,
      ...optionsPassed,
    });
  };
};

const {
  getChildContext,
  UNSAFE_componentWillMount,
  componentWillMount,
  componentDidMount,
  UNSAFE_componentWillReceiveProps,
  componentWillReceiveProps,
  shouldComponentUpdate,
  UNSAFE_componentWillUpdate,
  componentWillUpdate,
  getSnapshotBeforeUpdate,
  componentDidUpdate,
  componentDidCatch,
  componentWillUnmount,
} = Object.keys(LIFECYCLE_METHODS).reduce((exportsObject, method) => {
  exportsObject[method] = createSingleLifecycleMethodDecorator(method, addLifecycleMethods);

  return exportsObject;
}, {});

export {getChildContext};
export {UNSAFE_componentWillMount};
export {componentWillMount};
export {componentDidMount};
export {UNSAFE_componentWillReceiveProps};
export {componentWillReceiveProps};
export {shouldComponentUpdate};
export {UNSAFE_componentWillUpdate};
export {componentWillUpdate};
export {getSnapshotBeforeUpdate};
export {componentDidUpdate};
export {componentDidCatch};
export {componentWillUnmount};

export default addLifecycleMethods;
