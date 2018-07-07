# react-pure-lifecycle CHANGELOG

## 3.0.0

- Add missing lifecycle methods as named imports
  - `UNSAFE_componentWillMount`
  - `getChildContext`
  - `UNSAFE_componentWillReceiveProps`
  - `UNSAFE_componentWillUpdate`
  - `getSnapshotBeforeUpdate`
  - `componentDidCatch`
- Remove lodash dependency
- Support tree-shaking

#### BREAKING CHANGES

- When using CommonJS and accessing the default export, you must now do `require('react-pure-lifecycle').default`

## 2.2.0

- Update for support of new and `UNSAFE` lifecycle methods as-of versin 16.3
- Move `react` to peerDependencies

## 2.1.0

- Add support for `react` 16
- Fix `childContextTypes` being assigned an object even if not provided

## 2.0.0

- BREAKING CHANGES:
  - The second parameter in `1.1.0` was a boolean, to denote if `PureComponent` should be used for the HOC; this has been replaced with an object of options (see [the README](README.md#options) for more details)
  - `PureComponent` is now used by default for functional components
- Add `injectProps` option, which allows opting out of injecting the `props` as the first argument to the lifecycle methods
- Add the ability to give `childContextTypes` to functional components

## 1.1.0

- Add ability to make functional components pure
- Add support for decorating `PureComponent`s

## 1.0.3

- Add `.npmignore` for proper publishing

## 1.0.1-1.0.2

- README updates

## 1.0.0

- Initial release
