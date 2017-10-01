// external dependencies
import isPlainObject from 'lodash/isPlainObject';
import React from 'react';

//components
import {getClassHoc, getFunctionHoc} from './components';

// constants
import {DEFAULT_OPTIONS, LIFECYCLE_METHODS} from './constants';

// utils
import {createSingleLifecycleMethodDecorator, isReactClass} from './utils';

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
      ...optionsPassed
    });
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
} = Object.keys(LIFECYCLE_METHODS).reduce((exportsObject, method) => {
  exportsObject[method] = createSingleLifecycleMethodDecorator(method, addLifecycleMethods);

  return exportsObject;
}, {});

export {componentWillMount};
export {componentDidMount};
export {componentWillReceiveProps};
export {shouldComponentUpdate};
export {componentWillUpdate};
export {componentDidUpdate};
export {componentWillUnmount};

export default addLifecycleMethods;
