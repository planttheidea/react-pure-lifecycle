// external dependencies
import isPlainObject from 'lodash/isPlainObject';
import React from 'react';

//components
import {
  getClassHoc,
  getFunctionHoc
} from './components';

// constants
import {
  LIFECYCLE_METHODS
} from './constants';

// utils
import {
  createSingleLifecycleMethodDecorator,
  isReactClass
} from './utils';

/**
 * @function addLifecycleMethods
 *
 * @description
 * add the lifecycle hooks to the component and return it
 *
 * @param {Object} [options={}] the options passed
 * @returns {function(PassedComponent: ReactComponent): ReactComponent} the component augmented with lifecycle methods
 */
const addLifecycleMethods = (options = {}) => {
  if (!isPlainObject(options)) {
    throw new TypeError('Options passed must be a plain object.');
  }

  const {
    isPure = false,
    ...methods
  } = options;

  return (PassedComponent) => {
    const getHoc = isReactClass(PassedComponent) ? getClassHoc : getFunctionHoc;

    return getHoc(PassedComponent, methods, isPure);
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
  return {
    ...exportsObject,
    [method]: createSingleLifecycleMethodDecorator(method, addLifecycleMethods)
  };
}, {});

export {componentWillMount};
export {componentDidMount};
export {componentWillReceiveProps};
export {shouldComponentUpdate};
export {componentWillUpdate};
export {componentDidUpdate};
export {componentWillUnmount};

export default addLifecycleMethods;
