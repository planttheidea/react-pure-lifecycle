/**
 * @constant {Object} DEFAULT_OPTIONS
 */
export const DEFAULT_OPTIONS = {
  injectProps: true,
  usePureComponent: true,
};

/**
 * @constant {RegExp} FUNCTION_NAME_REGEXP
 */
export const FUNCTION_NAME_REGEXP = /function ([^\(]+)?\(/;

/**
 * @constant {boolean} IS_PRODUCTION
 * @default
 */
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/**
 * @constant {Object} LIFECYCLE_METHODS
 */
export const LIFECYCLE_METHODS = {
  UNSAFE_componentWillMount: true,
  UNSAFE_componentWillReceiveProps: true,
  UNSAFE_componentWillUpdate: true,
  componentDidCatch: true,
  componentDidMount: true,
  componentDidUpdate: true,
  componentWillMount: true,
  componentWillReceiveProps: true,
  componentWillUnmount: true,
  componentWillUpdate: true,
  getChildContext: true,
  getSnapshotBeforeUpdate: true,
  shouldComponentUpdate: true,
};
