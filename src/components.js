// external dependencies
import React, {
  Component,
  PureComponent
} from 'react';

// utils
import {
  getComponentDisplayName,
  setLifecycleMethods
} from './utils';

/**
 * @function getClassHoc
 *
 * @description
 * for class-based components, use inheritance inversion to retain state, overriding the lifecycle methods
 *
 * @param {ReactComponent} PassedComponent the component to wrap in an HOC
 * @param {Object} methods the methods to apply to the HOC
 * @param {Object} options the options for customizing implementation
 * @param {boolean} options.injectProps should the props be injected into the lifecycle methods
 * @returns {ReactComponent} HOC inheriting from PassedComponent with lifecycle methods
 */
export const getClassHoc = (PassedComponent, methods, {injectProps}) => {
  const displayName = getComponentDisplayName(PassedComponent);

  return class PureLifecycleClass extends PassedComponent {
    static displayName = displayName;

    constructor(...args) {
      super(...args);

      setLifecycleMethods(this, methods, injectProps);
    }

    render() {
      return super.render();
    }
  };
};

/**
 * @function getFunctionHoc
 *
 * @description
 * for function-based components, use a props proxy wrapper and add the lifecycle methods
 *
 * @param {ReactComponent} PassedComponent the component to wrap in an HOC
 * @param {Object} passedMethods the methods to apply to the HOC
 * @param {Object} options the options for customizing implementation
 * @param {boolean} options.injectProps should the props be injected into the lifecycle methods
 * @param {boolean} options.usePureComponent should the HOC be a PureComponent
 * @returns {ReactComponent} HOC wrapping PassedComponent with lifecycle methods
 */
export const getFunctionHoc = (PassedComponent, passedMethods, {injectProps, usePureComponent}) => {
  const ComponentToExtend = usePureComponent ? PureComponent : Component;
  const displayName = getComponentDisplayName(PassedComponent);

  const methods = {...passedMethods};
  const childContextTypes = PassedComponent.childContextTypes ? {...PassedComponent.childContextTypes} : undefined;

  if (childContextTypes) {
    // eslint-disable-next-line no-param-reassign
    delete PassedComponent.childContextTypes;
  }

  return class PureLifecycleFunctional extends ComponentToExtend {
    static displayName = displayName;

    static propTypes = PassedComponent.propTypes;
    static defaultProps = PassedComponent.defaultProps;

    static contextTypes = PassedComponent.contextTypes;
    static childContextTypes = childContextTypes;

    constructor(...args) {
      super(...args);

      setLifecycleMethods(this, methods, injectProps);
    }

    render() {
      return <PassedComponent {...this.props} />;
    }
  };
};
