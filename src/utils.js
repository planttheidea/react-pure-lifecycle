// external dependencies
import isFunction from 'lodash/isFunction';

// constants
import {FUNCTION_NAME_REGEXP, IS_PRODUCTION, LIFECYCLE_METHODS} from './constants';

/**
 * @function createSingleLifecycleMethodDecorator
 *
 * @description
 * partial application that will return the decorator for the
 * specific method based on the function passed
 *
 * @param {function} method the method to add as a lifecycle method
 * @param {function} addMethods the method that will add the lifecycle methods to the component
 * @returns {function(ReactComponent, Object): ReactComponent} the decorator for a specific method
 */
export const createSingleLifecycleMethodDecorator = (method, addMethods) => {
  return (fn, options) => {
    if (!isFunction(fn)) {
      throw new TypeError(`Parameter passed to ${method} must be a function.`);
    }

    return addMethods(
      {
        [method]: fn
      },
      options
    );
  };
};

/**
 * @function getComponentDisplayName
 *
 * @description
 * get the name to display for the component
 *
 * @param {ReactComponent} ReactComponent the component to get the name of
 * @returns {string} the display name of ReactComponent
 */
export const getComponentDisplayName = (ReactComponent) => {
  const componentName =
    ReactComponent.displayName ||
    ReactComponent.name ||
    (FUNCTION_NAME_REGEXP.exec(ReactComponent.toString()) || [])[1] ||
    'Component';

  return `PureLifecycle(${componentName})`;
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
  return (
    !!(ComponentToTest && ComponentToTest.prototype) && typeof ComponentToTest.prototype.isReactComponent === 'object'
  );
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
  return LIFECYCLE_METHODS[methodName]
    ? `The value passed for ${methodName} is not a function, skipping.`
    : `The key ${methodName} is not a valid lifecycle method, skipping.`;
};

/**
 * @function getLifecycleMethodWithPropsInjected
 *
 * @description
 * create a higher-order function that will inject the component's props as the first argument
 *
 * @param {ReactComponent} component the component whose props to retrieve
 * @param {function} method the method to call
 * @returns {function(...Array<*>): *} the higher-order function with props injected as argument
 */
export const getLifecycleMethodWithPropsInjected = (component, method) => {
  return (...args) => {
    return method(component.props, ...args);
  };
};

/**
 * @function setLifecycleMethods
 *
 * @description
 * assign the lifecycle methods to the instance
 *
 * @param {ReactComponent} component the component whose methods will be augmented
 * @param {Object} methods the methods to apply to the component
 * @param {boolean} injectProps should the props be injected as the method's first parameter
 * @returns {ReactComponent} the augmented component
 */
export const setLifecycleMethods = (component, methods, injectProps) => {
  return Object.keys(methods).reduce((instance, methodName) => {
    const method = methods[methodName];

    if (LIFECYCLE_METHODS[methodName] && isFunction(method)) {
      instance[methodName] = injectProps ? getLifecycleMethodWithPropsInjected(component, method) : method;
    } else if (!IS_PRODUCTION) {
      /* eslint-disable no-console */
      console.warn(getInvalidMethodWarning(methodName));
      /* eslint-enable */
    }

    return instance;
  }, component);
};
