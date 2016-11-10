// external dependencies
import isFunction from 'lodash/isFunction';

// constants
import {
  IS_PRODUCTION,
  LIFECYCLE_METHODS
} from './constants';

/**
 * partial application that will return the decorator for the
 * specific hook based on the function passed
 *
 * @param {function} method
 * @param {function} addHooks
 * @returns {function(Component): Component}
 */
const createSingleLifecycleMethodDecorator = (method, addHooks) => {
  return (fn) => {
    if (!isFunction(fn)) {
      throw new TypeError(`Parameter passed to ${method} must be a function.`);
    }

    return addHooks({
      [method]: fn
    });
  };
};

/**
 * assign the lifecycle methods to the instance
 *
 * @param {Component} component
 * @param {object} options
 * @returns {Component}
 */
const setLifecycleMethods = (component, options) => {
  return Object.keys(options).reduce((instance, method) => {
    if (!!~LIFECYCLE_METHODS.indexOf(method)) {
      if (isFunction(options[method])) {
        instance[method] = (...args) => {
          return options[method].call(undefined, component.props, ...args);
        };
      } else if (!IS_PRODUCTION) {
        /* eslint-disable no-console */
        console.warn(`The value passed for ${method} is not a function, skipping.`);
        /* eslint-enable */
      }
    } else if (!IS_PRODUCTION) {
      /* eslint-disable no-console */
      console.warn(`The key ${method} is not a valid lifecycle method, skipping.`);
      /* eslint-enable */
    }

    return instance;
  }, component);
};

export {createSingleLifecycleMethodDecorator};
export {setLifecycleMethods};
