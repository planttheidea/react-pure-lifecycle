// external dependencies
import React, {
  Component
} from 'react';

// utils
import {
  setLifecycleMethods
} from './utils';

/**
 * for class-based components, use inheritance inversion to retain
 * state, overriding the lifecycle methods
 *
 * @param {Component} PassedComponent
 * @param {object} options
 * @returns {Component}
 */
const getClassHoc = (PassedComponent, options) => {
  class PureLifecycleClass extends PassedComponent {
    constructor(...args) {
      super(...args);

      setLifecycleMethods(this, options);
    }

    render() {
      return super.render();
    }
  }

  return PureLifecycleClass;
};

/**
 * for function-based components, use a props proxy wrapper and
 * add the lifecycle methods
 *
 * @param {Component} PassedComponent
 * @param {object} options
 * @returns {Component}
 */
const getFunctionHoc = (PassedComponent, options) => {
  class PureLifecycleFunctional extends Component {
    static propTypes = PassedComponent.propTypes;
    static contextTypes = PassedComponent.contextTypes;
    static defaultProps = PassedComponent.defaultProps;

    constructor(...args) {
      super(...args);

      setLifecycleMethods(this, options);
    }

    render() {
      return (
        <PassedComponent {...this.props}/>
      );
    }
  }

  return PureLifecycleFunctional;
};

export {getClassHoc};
export {getFunctionHoc};
