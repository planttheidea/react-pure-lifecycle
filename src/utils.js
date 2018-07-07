// constants
import {
  FUNCTION_NAME_REGEXP,
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
 * @returns {function(ReactComponent, Object): ReactComponent} the decorator for a specific method
 */
export const createSingleLifecycleMethodDecorator = (method, addMethods) => (fn, options) => {
  if (typeof fn !== 'function') {
    throw new TypeError(`Parameter passed to ${method} must be a function.`);
  }

  return addMethods(
    {
      [method]: fn,
    },
    options
  );
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
    ReactComponent.displayName
    || ReactComponent.name
    || (FUNCTION_NAME_REGEXP.exec(ReactComponent.toString()) || [])[1]
    || 'Component';

  return `PureLifecycle(${componentName})`;
};

/**
 * @function isPlainObject
 *
 * @description
 * is the object passed a plain object
 *
 * @param {any} object the object to test
 * @returns {boolean} is the object a plain object
 */
export const isPlainObject = (object) => typeof object === 'object' && !!object && object.constructor === Object;

/**
 * @function isReactClass
 *
 * @description
 * is the component passed a react class
 *
 * @param {ReactComponent} ComponentToTest the component to test
 * @returns {boolean} is ComponentToTest a react component instantiated via the class
 */
export const isReactClass = (ComponentToTest) =>
  !!(ComponentToTest && ComponentToTest.prototype) && typeof ComponentToTest.prototype.isReactComponent === 'object';

/**
 * @function getInvalidMethodWarning
 *
 * @description
 * get the warning message to display in non-production environments when the method is invalid
 *
 * @param {string} methodName the name of the invalid method
 * @returns {string} the message to display in the warning
 */
export const getInvalidMethodWarning = (methodName) =>
  LIFECYCLE_METHODS[methodName]
    ? `The value passed for ${methodName} is not a function, skipping.`
    : `The key ${methodName} is not a valid lifecycle method, skipping.`;

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
export const getLifecycleMethodWithPropsInjected = (component, method) => (...args) => method(component.props, ...args);

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
export const setLifecycleMethods = (component, methods, injectProps) =>
  Object.keys(methods).reduce((instance, methodName) => {
    const method = methods[methodName];

    if (LIFECYCLE_METHODS[methodName] && typeof method === 'function') {
      instance[methodName] = injectProps ? getLifecycleMethodWithPropsInjected(component, method) : method;
    } else if (!IS_PRODUCTION) {
      // eslint-disable-next-line no-console
      console.warn(getInvalidMethodWarning(methodName));
    }

    return instance;
  }, component);
