"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require("react-stockcharts/lib/utils");

var _GenericChartComponent = require("../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _GenericComponent = require("../GenericComponent");

var _GenericComponent2 = _interopRequireDefault(_GenericComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DrawPositions = function (_Component) {
	_inherits(DrawPositions, _Component);

	function DrawPositions(props) {
		_classCallCheck(this, DrawPositions);

		var _this = _possibleConstructorReturn(this, (DrawPositions.__proto__ || Object.getPrototypeOf(DrawPositions)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);

		return _this;
	}

	_createClass(DrawPositions, [{
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			const { markers } = this.props;
			const { xScale, chartConfig: { yScale } } = moreProps;

			markers.map(markerGroup => {
				const { x1, y1, x2, y2 } = getCircleCoordinates(markerGroup, xScale, yScale)

				ctx.beginPath();
				ctx.strokeStyle = "#01987C";
				ctx.moveTo(x1, y1);
				ctx.arc(x1, y1, 4, 0, 2 * Math.PI, false);
				ctx.stroke();

				if (x2 > 0 && y2 > 0) {
					ctx.beginPath();
					ctx.strokeStyle = "#E73937";
					ctx.moveTo(x2, y2);
					ctx.arc(x2, y2, 4, 0, 2 * Math.PI, false);
					ctx.stroke();

					ctx.beginPath();
					ctx.strokeStyle = "#ffae29";
					ctx.lineWidth = 1;
					ctx.moveTo(x1, y1);
					ctx.lineTo(x2, y2)
					ctx.stroke()
				}
			})
		}
		}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(_GenericChartComponent2.default, {
				svgDraw: this.renderSVG,
				canvasDraw: this.drawOnCanvas,
				canvasToDraw: _GenericComponent.getAxisCanvas,
				drawOn: ["pan"]
			});
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			const { xScale, chartConfig: { yScale } } = moreProps;

			const { markers } = this.props;

			// markers.map((marker, i) => {
			// 	const circleCoordinates = getCircleCoordinates(marker, xScale, yScale);

			// 	return /*#__PURE__*/ React.createElement(
			// 		"svg",
			// 		{
			// 			key: i
			// 		},
			// 		/*#__PURE__*/ React.createElement(
			// 			"circle",
			// 			_extends(
			// 				{
			// 					cx: circleCoordinates.x1,
			// 					cy: circleCoordinates.y1,
			// 					stroke: "#006600"
			// 				},
			// 				commonCircleStyles
			// 			)
			// 		),
			// 		/*#__PURE__*/ React.createElement("line", {
			// 			x1: 0,
			// 			y1: 0,
			// 			x2: 0,
			// 			x2: 0,
			// 			stroke: "#ffae29",
			// 			strokeWidth: 1,
			// 			strokeDasharray: [5, 5],
			// 		}),
			// 		/*#__PURE__*/ React.createElement(
			// 			"circle",
			// 			_extends(
			// 				{
			// 					cx: circleCoordinates.x2,
			// 					cy: circleCoordinates.y2,
			// 					stroke: "#aa0000",
			// 					opacity: opacity
			// 				},
			// 				commonCircleStyles
			// 			)
			// 		)
			// 	);
			// })
		}
	}]);

	return DrawPositions;
}(_react.Component);

function getCircleCoordinates(markerGroup, xScale, yScale) {
	return {
		x1: xScale(markerGroup.x1),
		y1: Math.round(yScale(markerGroup.y1)),
		x2: xScale(markerGroup.x2),
		y2: Math.round(yScale(markerGroup.y2))
	};
}

DrawPositions.propTypes = {
	markers: _propTypes2.default.arrayOf(_propTypes2.default.shape({
		type: _propTypes2.default.string.isRequired, // OrderMarkerType, not string
		barTime: _propTypes2.default.string,
		barIndex: _propTypes2.default.number,
		price: _propTypes2.default.number.isRequired
	}))
};

exports.default = DrawPositions;
//# sourceMappingURL=DrawPositions.js.map