// external dependencies
import isFunction from 'lodash/isFunction';
import {
  Component,
  PureComponent
} from 'react';

// constants
import {
  IS_PRODUCTION,
  LIFECYCLE_METHODS
} from './constants';

/**
 * @function createSingleLifecycleMethodDecorator
 *
 * @description
 * partial application that will return the decorator for the
 * specific method based on the function passed
 *
 * @param {function} method the method to add as a lifecycle method
 * @param {function} addMethods the method that will add the lifecycle methods to the component
 * @returns {function(ReactComponent, boolean): ReactComponent} the decorator for a specific method
 */
export const createSingleLifecycleMethodDecorator = (method, addMethods) => {
  return (fn, isPure) => {
    if (!isFunction(fn)) {
      throw new TypeError(`Parameter passed to ${method} must be a function.`);
    }

    return addMethods({
      [method]: fn,
      isPure
    });
  };
};

/**
 * @function isReactClass
 *
 * @description
 * is the component passed a react class
 *
 * @param {ReactComponent} ComponentToTest the component to test
 * @returns {boolean} is ComponentToTest a react component instantiated via the class
 */
export const isReactClass = (ComponentToTest) => {
  return Component.isPrototypeOf(ComponentToTest) || PureComponent.isPrototypeOf(ComponentToTest);
};

/**
 * @function isValidLifecycleMethodName
 *
 * @description
 * is the methodName provided a valid lifecycle method name
 *
 * @param {string} methodName the name to check
 * @returns {boolean} is the methodName valid
 */
export const isValidLifecycleMethodName = (methodName) => {
  return !!LIFECYCLE_METHODS[methodName];
};

/**
 * @function getInvalidMethodWarning
 *
 * @description
 * get the warning message to display in non-production environments when the method is invalid
 *
 * @param {string} methodName the name of the invalid method
 * @returns {string} the message to display in the warning
 */
export const getInvalidMethodWarning = (methodName) => {
  return isValidLifecycleMethodName(methodName) ?
    `The value passed for ${methodName} is not a function, skipping.` :
    `The key ${methodName} is not a valid lifecycle method, skipping.`;
};

/**
 * @function setLifecycleMethods
 *
 * @description
 * assign the lifecycle methods to the instance
 *
 * @param {ReactComponent} component the component whose methods will be augmented
 * @param {object} methods the methods to apply to the component
 * @returns {ReactComponent} the augmented component
 */
export const setLifecycleMethods = (component, methods) => {
  return Object.keys(methods).reduce((instance, methodName) => {
    const method = methods[methodName];

    if (isValidLifecycleMethodName(methodName) && isFunction(method)) {
      instance[methodName] = (...args) => {
        return method(component.props, ...args);
      };

      return instance;
    }

    if (!IS_PRODUCTION) {
      /* eslint-disable no-console */
      console.warn(getInvalidMethodWarning(methodName));
      /* eslint-enable */
    }

    return instance;
  }, component);
};
