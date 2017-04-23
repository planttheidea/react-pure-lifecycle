# react-pure-lifecycle CHANGELOG

#### 2.0.0
* BREAKING CHANGES:
  * The second parameter in `1.1.0` was a boolean, to denote if `PureComponent` should be used for the HOC; this has been replaced with an object of options (see [the README](README.md#options) for more details)
  * `PureComponent` is now used by default for functional components
* Add `injectProps` option, which allows opting out of injecting the `props` as the first argument to the lifecycle methods
* Add the ability to give `childContextTypes` to functional components

#### 1.1.0
* Add ability to make functional components pure
* Add support for decorating `PureComponent`s

#### 1.0.3
* Add `.npmignore` for proper publishing

#### 1.0.1-1.0.2
* README updates

#### 1.0.0
* Initial release
