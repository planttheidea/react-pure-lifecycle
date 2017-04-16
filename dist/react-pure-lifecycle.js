(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["React"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return IS_PRODUCTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LIFECYCLE_METHODS; });
/**
 * @constant {boolean} IS_PRODUCTION
 * @default
 */
var IS_PRODUCTION = "development" === 'production';

/**
 * @constant {Array<string>} LIFECYCLE_METHODS
 */
var LIFECYCLE_METHODS = {
  componentWillMount: true,
  componentDidMount: true,
  componentWillReceiveProps: true,
  shouldComponentUpdate: true,
  componentWillUpdate: true,
  componentDidUpdate: true,
  componentWillUnmount: true
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_isFunction__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_isFunction___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_isFunction__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createSingleLifecycleMethodDecorator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isReactClass; });
/* unused harmony export isValidLifecycleMethodName */
/* unused harmony export getInvalidMethodWarning */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return setLifecycleMethods; });
// external dependencies



// constants


/**
 * @function createSingleLifecycleMethodDecorator
 *
 * @description
 * partial application that will return the decorator for the
 * specific method based on the function passed
 *
 * @param {function} method the method to add as a lifecycle method
 * @param {function} addMethods the method that will add the lifecycle methods to the component
 * @returns {function(ReactComponent, boolean): ReactComponent} the decorator for a specific method
 */
var createSingleLifecycleMethodDecorator = function createSingleLifecycleMethodDecorator(method, addMethods) {
  return function (fn, isPure) {
    var _addMethods;

    if (!__WEBPACK_IMPORTED_MODULE_0_lodash_isFunction___default()(fn)) {
      throw new TypeError('Parameter passed to ' + method + ' must be a function.');
    }

    return addMethods((_addMethods = {}, _addMethods[method] = fn, _addMethods.isPure = isPure, _addMethods));
  };
};

/**
 * @function isReactClass
 *
 * @description
 * is the component passed a react class
 *
 * @param {ReactComponent} ComponentToTest the component to test
 * @returns {boolean} is ComponentToTest a react component instantiated via the class
 */
var isReactClass = function isReactClass(ComponentToTest) {
  return __WEBPACK_IMPORTED_MODULE_1_react__["Component"].isPrototypeOf(ComponentToTest) || __WEBPACK_IMPORTED_MODULE_1_react__["PureComponent"].isPrototypeOf(ComponentToTest);
};

/**
 * @function isValidLifecycleMethodName
 *
 * @description
 * is the methodName provided a valid lifecycle method name
 *
 * @param {string} methodName the name to check
 * @returns {boolean} is the methodName valid
 */
var isValidLifecycleMethodName = function isValidLifecycleMethodName(methodName) {
  return !!__WEBPACK_IMPORTED_MODULE_2__constants__["a" /* LIFECYCLE_METHODS */][methodName];
};

/**
 * @function getInvalidMethodWarning
 *
 * @description
 * get the warning message to display in non-production environments when the method is invalid
 *
 * @param {string} methodName the name of the invalid method
 * @returns {string} the message to display in the warning
 */
var getInvalidMethodWarning = function getInvalidMethodWarning(methodName) {
  return isValidLifecycleMethodName(methodName) ? 'The value passed for ' + methodName + ' is not a function, skipping.' : 'The key ' + methodName + ' is not a valid lifecycle method, skipping.';
};

/**
 * @function setLifecycleMethods
 *
 * @description
 * assign the lifecycle methods to the instance
 *
 * @param {ReactComponent} component the component whose methods will be augmented
 * @param {object} methods the methods to apply to the component
 * @returns {ReactComponent} the augmented component
 */
var setLifecycleMethods = function setLifecycleMethods(component, methods) {
  return Object.keys(methods).reduce(function (instance, methodName) {
    var method = methods[methodName];

    if (isValidLifecycleMethodName(methodName) && __WEBPACK_IMPORTED_MODULE_0_lodash_isFunction___default()(method)) {
      instance[methodName] = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return method.apply(undefined, [component.props].concat(args));
      };

      return instance;
    }

    if (!__WEBPACK_IMPORTED_MODULE_2__constants__["b" /* IS_PRODUCTION */]) {
      /* eslint-disable no-console */
      console.warn(getInvalidMethodWarning(methodName));
      /* eslint-enable */
    }

    return instance;
  }, component);
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_isPlainObject__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_isPlainObject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_isPlainObject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "componentWillMount", function() { return componentWillMount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "componentDidMount", function() { return componentDidMount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "componentWillReceiveProps", function() { return componentWillReceiveProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldComponentUpdate", function() { return shouldComponentUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "componentWillUpdate", function() { return componentWillUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "componentDidUpdate", function() { return componentDidUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "componentWillUnmount", function() { return componentWillUnmount; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// external dependencies



//components


// constants


// utils


/**
 * @function addLifecycleMethods
 *
 * @description
 * add the lifecycle hooks to the component and return it
 *
 * @param {Object} [options={}] the options passed
 * @returns {function(PassedComponent: ReactComponent): ReactComponent} the component augmented with lifecycle methods
 */
var addLifecycleMethods = function addLifecycleMethods() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!__WEBPACK_IMPORTED_MODULE_0_lodash_isPlainObject___default()(options)) {
    throw new TypeError('Options passed must be a plain object.');
  }

  var _options$isPure = options.isPure,
      isPure = _options$isPure === undefined ? false : _options$isPure,
      methods = _objectWithoutProperties(options, ['isPure']);

  return function (PassedComponent) {
    var getHoc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* isReactClass */])(PassedComponent) ? __WEBPACK_IMPORTED_MODULE_2__components__["a" /* getClassHoc */] : __WEBPACK_IMPORTED_MODULE_2__components__["b" /* getFunctionHoc */];

    return getHoc(PassedComponent, methods, isPure);
  };
};

var _Object$keys$reduce = Object.keys(__WEBPACK_IMPORTED_MODULE_3__constants__["a" /* LIFECYCLE_METHODS */]).reduce(function (exportsObject, method) {
  var _extends2;

  return _extends({}, exportsObject, (_extends2 = {}, _extends2[method] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* createSingleLifecycleMethodDecorator */])(method, addLifecycleMethods), _extends2));
}, {}),
    componentWillMount = _Object$keys$reduce.componentWillMount,
    componentDidMount = _Object$keys$reduce.componentDidMount,
    componentWillReceiveProps = _Object$keys$reduce.componentWillReceiveProps,
    shouldComponentUpdate = _Object$keys$reduce.shouldComponentUpdate,
    componentWillUpdate = _Object$keys$reduce.componentWillUpdate,
    componentDidUpdate = _Object$keys$reduce.componentDidUpdate,
    componentWillUnmount = _Object$keys$reduce.componentWillUnmount;









/* harmony default export */ __webpack_exports__["default"] = (addLifecycleMethods);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getClassHoc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getFunctionHoc; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// external dependencies


// utils


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
var getClassHoc = function getClassHoc(PassedComponent, methods) {
  return function (_PassedComponent) {
    _inherits(PureLifecycleClass, _PassedComponent);

    function PureLifecycleClass() {
      _classCallCheck(this, PureLifecycleClass);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = _possibleConstructorReturn(this, _PassedComponent.call.apply(_PassedComponent, [this].concat(args)));

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* setLifecycleMethods */])(_this, methods);
      return _this;
    }

    PureLifecycleClass.prototype.render = function render() {
      return _PassedComponent.prototype.render.call(this);
    };

    return PureLifecycleClass;
  }(PassedComponent);
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
var getFunctionHoc = function getFunctionHoc(PassedComponent, methods, isPure) {
  var _class, _temp;

  var ComponentToExtend = isPure ? __WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] : __WEBPACK_IMPORTED_MODULE_0_react__["Component"];

  return _temp = _class = function (_ComponentToExtend) {
    _inherits(PureLifecycleFunctional, _ComponentToExtend);

    function PureLifecycleFunctional() {
      _classCallCheck(this, PureLifecycleFunctional);

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var _this2 = _possibleConstructorReturn(this, _ComponentToExtend.call.apply(_ComponentToExtend, [this].concat(args)));

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* setLifecycleMethods */])(_this2, methods);
      return _this2;
    }

    PureLifecycleFunctional.prototype.render = function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(PassedComponent, this.props);
    };

    return PureLifecycleFunctional;
  }(ComponentToExtend), _class.propTypes = PassedComponent.propTypes, _class.contextTypes = PassedComponent.contextTypes, _class.defaultProps = PassedComponent.defaultProps, _temp;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(7);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

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


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(3),
    isObject = __webpack_require__(9);

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


/***/ }),
/* 9 */
/***/ (function(module, exports) {

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


/***/ }),
/* 10 */
/***/ (function(module, exports) {

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


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(3),
    getPrototype = __webpack_require__(6),
    isObjectLike = __webpack_require__(10);

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


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ })
/******/ ]);
});
//# sourceMappingURL=react-pure-lifecycle.js.map