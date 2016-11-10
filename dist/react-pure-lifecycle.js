(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["React"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.componentWillUnmount = exports.componentDidUpdate = exports.componentWillUpdate = exports.shouldComponentUpdate = exports.componentWillReceiveProps = exports.componentDidMount = exports.componentWillMount = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // external dependencies
	
	
	// utils
	
	
	// constants
	
	
	var _isPlainObject = __webpack_require__(2);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _components = __webpack_require__(8);
	
	var _utils = __webpack_require__(9);
	
	var _constants = __webpack_require__(12);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	/**
	 * add the lifecycle hooks to the component and return it
	 *
	 * @param {object} options={}
	 * @returns {function(PassedComponent: Component): Component}
	 */
	var addLifecycleHooks = function addLifecycleHooks() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  if (!(0, _isPlainObject2.default)(options)) {
	    throw new TypeError('Options passed must be a plain object.');
	  }
	
	  return function (PassedComponent) {
	    if (_react.Component.isPrototypeOf(PassedComponent)) {
	      return (0, _components.getClassHoc)(PassedComponent, options);
	    }
	
	    return (0, _components.getFunctionHoc)(PassedComponent, options);
	  };
	};
	
	var _LIFECYCLE_METHODS$re = _constants.LIFECYCLE_METHODS.reduce(function (exportsObject, method) {
	  return _extends({}, exportsObject, _defineProperty({}, method, (0, _utils.createSingleLifecycleMethodDecorator)(method, addLifecycleHooks)));
	}, {}),
	    componentWillMount = _LIFECYCLE_METHODS$re.componentWillMount,
	    componentDidMount = _LIFECYCLE_METHODS$re.componentDidMount,
	    componentWillReceiveProps = _LIFECYCLE_METHODS$re.componentWillReceiveProps,
	    shouldComponentUpdate = _LIFECYCLE_METHODS$re.shouldComponentUpdate,
	    componentWillUpdate = _LIFECYCLE_METHODS$re.componentWillUpdate,
	    componentDidUpdate = _LIFECYCLE_METHODS$re.componentDidUpdate,
	    componentWillUnmount = _LIFECYCLE_METHODS$re.componentWillUnmount;
	
	exports.componentWillMount = componentWillMount;
	exports.componentDidMount = componentDidMount;
	exports.componentWillReceiveProps = componentWillReceiveProps;
	exports.shouldComponentUpdate = shouldComponentUpdate;
	exports.componentWillUpdate = componentWillUpdate;
	exports.componentDidUpdate = componentDidUpdate;
	exports.componentWillUnmount = componentWillUnmount;
	exports.default = addLifecycleHooks;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(3),
	    getPrototype = __webpack_require__(4),
	    isObjectLike = __webpack_require__(6);
	
	/** `Object#toString` result references. */
	var objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);
	
	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}
	
	module.exports = isPlainObject;


/***/ },
/* 3 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;
	
	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}
	
	module.exports = objectToString;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(5);
	
	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);
	
	module.exports = getPrototype;


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}
	
	module.exports = overArg;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getFunctionHoc = exports.getClassHoc = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utils = __webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // external dependencies
	
	
	// utils
	
	
	/**
	 * for class-based components, use inheritance inversion to retain
	 * state, overriding the lifecycle methods
	 *
	 * @param {Component} PassedComponent
	 * @param {object} options
	 * @returns {Component}
	 */
	var getClassHoc = function getClassHoc(PassedComponent, options) {
	  var PureLifecycleClass = function (_PassedComponent) {
	    _inherits(PureLifecycleClass, _PassedComponent);
	
	    function PureLifecycleClass() {
	      var _ref;
	
	      _classCallCheck(this, PureLifecycleClass);
	
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      var _this = _possibleConstructorReturn(this, (_ref = PureLifecycleClass.__proto__ || Object.getPrototypeOf(PureLifecycleClass)).call.apply(_ref, [this].concat(args)));
	
	      (0, _utils.setLifecycleMethods)(_this, options);
	      return _this;
	    }
	
	    _createClass(PureLifecycleClass, [{
	      key: 'render',
	      value: function render() {
	        return _get(PureLifecycleClass.prototype.__proto__ || Object.getPrototypeOf(PureLifecycleClass.prototype), 'render', this).call(this);
	      }
	    }]);
	
	    return PureLifecycleClass;
	  }(PassedComponent);
	
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
	var getFunctionHoc = function getFunctionHoc(PassedComponent, options) {
	  var _class, _temp;
	
	  var PureLifecycleFunctional = (_temp = _class = function (_Component) {
	    _inherits(PureLifecycleFunctional, _Component);
	
	    function PureLifecycleFunctional() {
	      var _ref2;
	
	      _classCallCheck(this, PureLifecycleFunctional);
	
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	
	      var _this2 = _possibleConstructorReturn(this, (_ref2 = PureLifecycleFunctional.__proto__ || Object.getPrototypeOf(PureLifecycleFunctional)).call.apply(_ref2, [this].concat(args)));
	
	      (0, _utils.setLifecycleMethods)(_this2, options);
	      return _this2;
	    }
	
	    _createClass(PureLifecycleFunctional, [{
	      key: 'render',
	      value: function render() {
	        return _react2.default.createElement(PassedComponent, this.props);
	      }
	    }]);
	
	    return PureLifecycleFunctional;
	  }(_react.Component), _class.propTypes = PassedComponent.propTypes, _class.contextTypes = PassedComponent.contextTypes, _class.defaultProps = PassedComponent.defaultProps, _temp);
	
	
	  return PureLifecycleFunctional;
	};
	
	exports.getClassHoc = getClassHoc;
	exports.getFunctionHoc = getFunctionHoc;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setLifecycleMethods = exports.createSingleLifecycleMethodDecorator = undefined;
	
	var _isFunction = __webpack_require__(10);
	
	var _isFunction2 = _interopRequireDefault(_isFunction);
	
	var _constants = __webpack_require__(12);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // external dependencies
	
	
	// constants
	
	
	/**
	 * partial application that will return the decorator for the
	 * specific hook based on the function passed
	 *
	 * @param {function} method
	 * @param {function} addHooks
	 * @returns {function(Component): Component}
	 */
	var createSingleLifecycleMethodDecorator = function createSingleLifecycleMethodDecorator(method, addHooks) {
	  return function (fn) {
	    if (!(0, _isFunction2.default)(fn)) {
	      throw new TypeError('Parameter passed to ' + method + ' must be a function.');
	    }
	
	    return addHooks(_defineProperty({}, method, fn));
	  };
	};
	
	/**
	 * assign the lifecycle methods to the instance
	 *
	 * @param {Component} component
	 * @param {object} options
	 * @returns {Component}
	 */
	var setLifecycleMethods = function setLifecycleMethods(component, options) {
	  return Object.keys(options).reduce(function (instance, method) {
	    if (!!~_constants.LIFECYCLE_METHODS.indexOf(method)) {
	      if ((0, _isFunction2.default)(options[method])) {
	        instance[method] = function () {
	          var _options$method;
	
	          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	          }
	
	          return (_options$method = options[method]).call.apply(_options$method, [undefined, component.props].concat(args));
	        };
	      } else if (!_constants.IS_PRODUCTION) {
	        /* eslint-disable no-console */
	        console.warn('The value passed for ' + method + ' is not a function, skipping.');
	        /* eslint-enable */
	      }
	    } else if (!_constants.IS_PRODUCTION) {
	      /* eslint-disable no-console */
	      console.warn('The key ' + method + ' is not a valid lifecycle method, skipping.');
	      /* eslint-enable */
	    }
	
	    return instance;
	  }, component);
	};
	
	exports.createSingleLifecycleMethodDecorator = createSingleLifecycleMethodDecorator;
	exports.setLifecycleMethods = setLifecycleMethods;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(3),
	    isObject = __webpack_require__(11);
	
	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var IS_PRODUCTION = ("development") === 'production';
	
	var LIFECYCLE_METHODS = ['componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate', 'componentWillUnmount'];
	
	exports.IS_PRODUCTION = IS_PRODUCTION;
	exports.LIFECYCLE_METHODS = LIFECYCLE_METHODS;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-pure-lifecycle.js.map