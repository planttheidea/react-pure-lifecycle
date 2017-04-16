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
 * @returns {ReactComponent} HOC inheriting from PassedComponent with lifecycle methods
 */
export const getClassHoc = (PassedComponent, methods) => {
  const displayName = getComponentDisplayName(PassedComponent);

  return class PureLifecycleClass extends PassedComponent {
    static displayName = displayName;

    constructor(...args) {
      super(...args);

      setLifecycleMethods(this, methods);
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
 * @param {boolean} isPure is the component pure or not
 * @returns {ReactComponent} HOC wrapping PassedComponent with lifecycle methods
 */
export const getFunctionHoc = (PassedComponent, methods, isPure) => {
  const ComponentToExtend = isPure ? PureComponent : Component;
  const displayName = getComponentDisplayName(PassedComponent);

  return class PureLifecycleFunctional extends ComponentToExtend {
    static contextTypes = PassedComponent.contextTypes;
    static displayName = displayName;
    static defaultProps = PassedComponent.defaultProps;
    static propTypes = PassedComponent.propTypes;

    constructor(...args) {
      super(...args);

      setLifecycleMethods(this, methods);
    }

    render() {
      return (
        <PassedComponent {...this.props}/>
      );
    }
  };
};
