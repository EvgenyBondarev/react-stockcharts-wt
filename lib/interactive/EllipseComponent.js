"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require("../utils");

var _utils2 = require("./utils");

var _EachEllipse = require("./wrapper/EachEllipse");

var _EachEllipse2 = _interopRequireDefault(_EachEllipse);
//////
var _EllipseSVG = require("../interactive/components/EllipseSVG");

var _EllipseSVG2 = _interopRequireDefault(_EllipseSVG);
///////
// var _StraightLine = require("./components/StraightLine");

// var _StraightLine2 = _interopRequireDefault(_StraightLine);

var _MouseLocationIndicator = require("./components/MouseLocationIndicator");

var _MouseLocationIndicator2 = _interopRequireDefault(_MouseLocationIndicator);

var _HoverTextNearMouse = require("./components/HoverTextNearMouse");

var _HoverTextNearMouse2 = _interopRequireDefault(_HoverTextNearMouse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var aliases = {
  mouseleave: "mousemove", // to draw interactive after mouse exit
  panend: "pan",
  pinchzoom: "pan",
  mousedown: "mousemove",
  click: "mousemove",
  contextmenu: "mousemove",
  dblclick: "mousemove",
  dragstart: "drag",
  dragend: "drag",
  dragcancel: "drag"
};


var Ellipse = function (_Component) {
  _inherits(Ellipse, _Component);

  function Ellipse(props) {
    _classCallCheck(this, Ellipse);

    var _this = _possibleConstructorReturn(this, (Ellipse.__proto__ || Object.getPrototypeOf(Ellipse)).call(this, props));

    _this.handleStart = _this.handleStart.bind(_this);
    _this.handleEnd = _this.handleEnd.bind(_this);
    _this.handleDrawLine = _this.handleDrawLine.bind(_this);
    _this.handleDragLine = _this.handleDragLine.bind(_this);
    _this.handleDragLineComplete = _this.handleDragLineComplete.bind(_this);
    _this.listener = _this.listener.bind(_this); //tolik
    _this.evaluateType = _this.evaluateType.bind(_this);//tolik

    _this.terminate = _utils2.terminate.bind(_this);
    _this.saveNodeType = _utils2.saveNodeType.bind(_this);

    _this.getSelectionState = (0, _utils2.isHoverForInteractiveType)("trends").bind(_this);

    _this.state = {};
    _this.nodes = [];
    return _this;
  }

  _createClass(Ellipse, [{
    key: "handleDragLine",
    value: function handleDragLine(index, newXYValue) {

      this.setState({
        override: _extends({
          index: index
        }, newXYValue)
      });
    }
  },
  //
    // { //tolik
    //   key: "componentWillReceiveProps",
    //   value: function componentWillReceiveProps(nextProps, nextContext) {
    //     console.log("updated")
    //   }
    // },
    { //tolik
      key: "listener",
      value: function listener(type, moreProps, state, e) {
        // console.log(e.shiftKey)

        this.evaluationInProgress = true;
        this.evaluateType(type, e);
        this.evaluationInProgress = false;
      }
    }, {
      key: "evaluateType",
      value: function evaluateType(type, e) {
        var newType = aliases[type] || type;
        var proceed = this.props.drawOn.indexOf(newType) > -1;

        // console.log("type ->", type, proceed);

        if (!proceed) return;
        this.preEvaluate(type, this.moreProps, e);
        if (!this.shouldTypeProceed(type, this.moreProps)) return;

        switch (type) {

          case "mousemove":
            {
            console.log("mooving")
              break;
            }
        }
      }
    },
  //
  {
    key: "handleDragLineComplete",
    value: function handleDragLineComplete(moreProps) {
      var _this2 = this;

      var override = this.state.override;

      if ((0, _utils.isDefined)(override)) {
        var trends = this.props.trends;

        var newTrends = trends.map(function (each, idx) {
          return idx === override.index ? _extends({}, each, {
            start: [override.x1Value, override.y1Value],
            end: [override.x2Value, override.y2Value],
            selected: true
          }) : _extends({}, each, {
            selected: false
          });
        });

        this.setState({
          override: null
        }, function () {
          _this2.props.onComplete(newTrends, moreProps);
        });
      }
    }
  }, {
    key: "handleDrawLine",
    value: function handleDrawLine(xyValue) {
      var current = this.state.current;

      if ((0, _utils.isDefined)(current) && (0, _utils.isDefined)(current.start)) {
        this.mouseMoved = true;
        this.setState({
          current: {
            start: current.start,
            end: xyValue
          }
        });
      }
    }
  }, {
    key: "handleStart",
    value: function handleStart(xyValue, moreProps, e) {
      var _this3 = this;

      var current = this.state.current;


      if ((0, _utils.isNotDefined)(current) || (0, _utils.isNotDefined)(current.start)) {
        this.mouseMoved = false;

        this.setState({
          current: {
            start: xyValue,
            end: null
          }
        }, function () {
          _this3.props.onStart(moreProps, e);
        });
      }
    }
  }, {
    key: "handleEnd",
    value: function handleEnd(xyValue, moreProps, e) {

      var _this4 = this;
      var current = this.state.current;
      var _props = this.props,
        trends = _props.trends,
        appearance = _props.appearance,
        type = _props.type;


      if (this.mouseMoved && (0, _utils.isDefined)(current) && (0, _utils.isDefined)(current.start)) {
        var newTrends = [].concat(_toConsumableArray(trends.map(function (d) {
          return _extends({}, d, { selected: false });
        })), [{
          start: current.start,
          end: xyValue,
          selected: true,
          appearance: appearance,
          type: type
        }]);
        this.setState({
          current: null,
          trends: newTrends
        }, function () {
          _this4.props.onComplete(newTrends, moreProps, e);
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;
      var appearance = this.props.appearance;
      var _props2 = this.props,
        enabled = _props2.enabled,
        snap = _props2.snap,
        shouldDisableSnap = _props2.shouldDisableSnap,
        snapTo = _props2.snapTo,
        type = _props2.type;
      var _props3 = this.props,
        currentPositionRadius = _props3.currentPositionRadius,
        currentPositionStroke = _props3.currentPositionStroke;
      var _props4 = this.props,
        currentPositionstrokeOpacity = _props4.currentPositionstrokeOpacity,
        currentPositionStrokeWidth = _props4.currentPositionStrokeWidth;
      var _props5 = this.props,
        hoverText = _props5.hoverText,
        trends = _props5.trends;
      var _state = this.state,
        current = _state.current,
        override = _state.override;

      var tempLine = (0, _utils.isDefined)(current) && (0, _utils.isDefined)(current.end) ? _react2.default.createElement(_EllipseSVG2.default, {
        type: type,
        noHover: true,
        x1Value: current.start[0],
        y1Value: current.start[1],
        x2Value: current.end[0],
        y2Value: current.end[1],
        stroke: appearance.stroke,
        strokeWidth: appearance.strokeWidth,
        strokeOpacity: appearance.strokeOpacity
      }) : null;

      return _react2.default.createElement(
        "g",
        null,
        trends.map(function (each, idx) {
          var eachAppearance = (0, _utils.isDefined)(each.appearance) ? _extends({}, appearance, each.appearance) : appearance;

          var hoverTextWithDefault = _extends({}, Ellipse.defaultProps.hoverText, hoverText);

          return _react2.default.createElement(_EachEllipse2.default, {
            key: idx,
            ref: _this5.saveNodeType(idx),
            index: idx,
            coords: each.coordinates,
            type: each.type,
            selected: each.selected,
            x1Value: (0, _utils2.getValueFromOverride)(override, idx, "x1Value", each.start[0]),
            y1Value: (0, _utils2.getValueFromOverride)(override, idx, "y1Value", each.start[1]),
            x2Value: (0, _utils2.getValueFromOverride)(override, idx, "x2Value", each.end[0]),
            y2Value: (0, _utils2.getValueFromOverride)(override, idx, "y2Value", each.end[1]),
            stroke: eachAppearance.stroke,
            strokeWidth: eachAppearance.strokeWidth,
            strokeOpacity: eachAppearance.strokeOpacity,
            strokeDasharray: eachAppearance.strokeDasharray,
            edgeStroke: eachAppearance.edgeStroke,
            edgeFill: eachAppearance.edgeFill,
            edgeStrokeWidth: eachAppearance.edgeStrokeWidth,
            r: eachAppearance.r,
            hoverText: hoverTextWithDefault,

            onDrag: _this5.handleDragLine,
            onDragComplete: _this5.handleDragLineComplete,
            edgeInteractiveCursor: "react-stockcharts-move-cursor",
            lineInteractiveCursor: "react-stockcharts-move-cursor"
          });
        }),
        tempLine,
        _react2.default.createElement(_MouseLocationIndicator2.default, {
          enabled: enabled,
          snap: snap,
          shouldDisableSnap: shouldDisableSnap,
          snapTo: snapTo,
          r: currentPositionRadius,
          stroke: currentPositionStroke,
          strokeOpacity: currentPositionstrokeOpacity,
          strokeWidth: currentPositionStrokeWidth,
          onMouseDown: this.handleStart,
          onClick: this.handleEnd,
          onMouseMove: this.handleDrawLine
        })
      );
    }
  }]);

  return Ellipse;
}(_react.Component);

Ellipse.propTypes = {
  snap: _propTypes2.default.bool.isRequired,
  enabled: _propTypes2.default.bool.isRequired,
  snapTo: _propTypes2.default.func,
  shouldDisableSnap: _propTypes2.default.func.isRequired,

  onStart: _propTypes2.default.func.isRequired,
  onComplete: _propTypes2.default.func.isRequired,
  onSelect: _propTypes2.default.func,
  onMouseMove: _propTypes2.default.func, //tolik
  currentPositionStroke: _propTypes2.default.string,
  currentPositionStrokeWidth: _propTypes2.default.number,
  currentPositionstrokeOpacity: _propTypes2.default.number,
  currentPositionRadius: _propTypes2.default.number,
  type: _propTypes2.default.oneOf(["XLINE", // extends from -Infinity to +Infinity
    "RAY", // extends to +/-Infinity in one direction
    "LINE",
    "RECT"] // extends between the set bounds
  ),
  hoverText: _propTypes2.default.object.isRequired,

  trends: _propTypes2.default.array.isRequired,

  appearance: _propTypes2.default.shape({
    stroke: _propTypes2.default.string.isRequired,
    strokeOpacity: _propTypes2.default.number.isRequired,
    strokeWidth: _propTypes2.default.number.isRequired,
    strokeDasharray: _propTypes2.default.oneOf(_utils.strokeDashTypes),
    edgeStrokeWidth: _propTypes2.default.number.isRequired,
    edgeFill: _propTypes2.default.string.isRequired,
    edgeStroke: _propTypes2.default.string.isRequired
  }).isRequired
};

Ellipse.defaultProps = {
  type: "RECT",

  onStart: _utils.noop,
  onComplete: _utils.noop,
  onSelect: _utils.noop,
  onMouseMove: _utils.noop, //tolik

  currentPositionStroke: "rgba(47, 189, 47, .2)",
  currentPositionstrokeOpacity: 0,
  currentPositionStrokeWidth: 0,
  currentPositionRadius: 0,

  shouldDisableSnap: function shouldDisableSnap(e) {
    return e.button === 2 || e.shiftKey;
  },
  hoverText: _extends({}, _HoverTextNearMouse2.default.defaultProps, {
    enable: true,
    bgHeight: "auto",
    bgWidth: "auto",
    text: "Click to select object",
    selectedText: ""
  }),
  trends: [],

  appearance: {
    stroke: "rgba(47, 189, 47, .2)",
    strokeOpacity: 0,
    strokeWidth: 0,
    strokeDasharray: "Solid",
    edgeStrokeWidth: 0,
    edgeFill: "#0000ff",
    edgeStroke: "#ff0000",
    r: 0
  }
};

exports.default = Ellipse;
