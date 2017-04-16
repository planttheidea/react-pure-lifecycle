/**
 * @constant {boolean} IS_PRODUCTION
 * @default
 */
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/**
 * @constant {Array<string>} LIFECYCLE_METHODS
 */
export const LIFECYCLE_METHODS = {
  componentWillMount: true,
  componentDidMount: true,
  componentWillReceiveProps: true,
  shouldComponentUpdate: true,
  componentWillUpdate: true,
  componentDidUpdate: true,
  componentWillUnmount: true
};
