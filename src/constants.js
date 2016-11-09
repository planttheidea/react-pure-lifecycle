const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const LIFECYCLE_METHODS = [
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount'
];

export {IS_PRODUCTION};
export {LIFECYCLE_METHODS};
