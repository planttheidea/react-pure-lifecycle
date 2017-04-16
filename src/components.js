// external dependencies
import React, {
  Component,
  PureComponent
} from 'react';

// utils
import {
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
  return class PureLifecycleClass extends PassedComponent {
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

  return class PureLifecycleFunctional extends ComponentToExtend {
    static propTypes = PassedComponent.propTypes;
    static contextTypes = PassedComponent.contextTypes;
    static defaultProps = PassedComponent.defaultProps;

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
