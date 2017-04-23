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
 * @param {Object} methods the methods to apply to the HOC
 * @param {Object} options the options for customizing implementation
 * @param {boolean} options.injectProps should the props be injected into the lifecycle methods
 * @param {boolean} options.usePureComponent should the HOC be a PureComponent
 * @returns {ReactComponent} HOC wrapping PassedComponent with lifecycle methods
 */
export const getFunctionHoc = (PassedComponent, methods, {injectProps, usePureComponent}) => {
  const ComponentToExtend = usePureComponent ? PureComponent : Component;
  const displayName = getComponentDisplayName(PassedComponent);

  const childContextTypes = PassedComponent.childContextTypes;

  if (childContextTypes) {
    delete PassedComponent.childContextTypes;
  }

  return class PureLifecycleFunctional extends ComponentToExtend {
    static childContextTypes = childContextTypes;
    static contextTypes = PassedComponent.contextTypes;
    static displayName = displayName;
    static defaultProps = PassedComponent.defaultProps;
    static propTypes = PassedComponent.propTypes;

    constructor(...args) {
      super(...args);

      setLifecycleMethods(this, methods, injectProps);
    }

    render() {
      return (
        <PassedComponent {...this.props}/>
      );
    }
  };
};
