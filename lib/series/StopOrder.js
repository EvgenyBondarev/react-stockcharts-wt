'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})

var _extends =
	Object.assign ||
	function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i]
			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key]
				}
			}
		}
		return target
	}

var _createClass = (function() {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i]
			descriptor.enumerable = descriptor.enumerable || false
			descriptor.configurable = true
			if ('value' in descriptor) descriptor.writable = true
			Object.defineProperty(target, descriptor.key, descriptor)
		}
	}
	return function(Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps)
		if (staticProps) defineProperties(Constructor, staticProps)
		return Constructor
	}
})()

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _utils = require('react-stockcharts/lib/utils')

var _GenericChartComponent = require('react-stockcharts/lib/GenericChartComponent')

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent)

var _GenericComponent = require('react-stockcharts/lib/GenericComponent')

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj }
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function')
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError(
			"this hasn't been initialised - super() hasn't been called"
		)
	}
	return call && (typeof call === 'object' || typeof call === 'function')
		? call
		: self
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== 'function' && superClass !== null) {
		throw new TypeError(
			'Super expression must either be null or a function, not ' +
				typeof superClass
		)
	}
	subClass.prototype = Object.create(superClass && superClass.prototype, {
		constructor: {
			value: subClass,
			enumerable: false,
			writable: true,
			configurable: true
		}
	})
	if (superClass)
		Object.setPrototypeOf
			? Object.setPrototypeOf(subClass, superClass)
			: (subClass.__proto__ = superClass)
}

var StopOrder = (function(_Component) {
	_inherits(StopOrder, _Component)

	function StopOrder(props) {
		_classCallCheck(this, StopOrder)

		var _this = _possibleConstructorReturn(
			this,
			(StopOrder.__proto__ || Object.getPrototypeOf(StopOrder)).call(
				this,
				props
			)
		)

		_this.renderSVG = _this.renderSVG.bind(_this)
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this)

		return _this
	}

	_createClass(StopOrder, [
		{
			key: 'drawOnCanvas',
			value: function drawOnCanvas(ctx, moreProps) {
				const {
					type,
					stroke,
					strokeWidth,
					opacity,
					strokeDasharray,
					orderType,
					stopOrderType,
					marketOrPendingPrice,
					symbol
				} = this.props
				const { yValue } = this.props
				const {
					chartConfig: { yScale, width }
				} = moreProps

				ctx.beginPath()

				ctx.strokeStyle = (0, _utils.hexToRGBA)(stroke, opacity)
				ctx.lineWidth = strokeWidth

				var _getLineCoordinates = getLineCoordinates(yScale, yValue, width),
					x1 = _getLineCoordinates.x1,
					y1 = _getLineCoordinates.y1,
					x2 = _getLineCoordinates.x2,
					y2 = _getLineCoordinates.y2

				const { x, y } = getTextCoordinates(symbol, yScale, yValue, width)
				const distanceInPips = getDistanceInPips(
					symbol,
					orderType,
					stopOrderType,
					marketOrPendingPrice,
					yValue
				)

				let stopOrderText = ''

				switch (stopOrderType) {
					case 'sl': {
						stopOrderText = 'stop loss'
						break
					}
					case 'tp': {
						stopOrderText = 'take profit'
						break
					}
					// TODO: make cases for buy limit, buy stop, sell limit, sell stop

					default:
						break
				}

				ctx.setLineDash(
					(0, _utils.getStrokeDasharray)(strokeDasharray).split(',')
				)
				ctx.moveTo(x1, y1)
				ctx.lineTo(x2, y2)
				ctx.stroke()
				ctx.font = '13px sans-serif'
				ctx.fillText(`${stopOrderText} (${distanceInPips})`, x, y)
			}
		},
		{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(_GenericChartComponent2.default, {
					svgDraw: this.renderSVG,
					canvasDraw: this.drawOnCanvas,
					canvasToDraw: _GenericComponent.getAxisCanvas,
					drawOn: ['pan']
				})
			}
		},
		{
			key: 'renderSVG',
			value: function renderSVG(moreProps) {
				const { width } = moreProps
				const {
					chartConfig: { yScale }
				} = moreProps

				const { className } = this.props
				const {
					stopOrderType,
					symbol,
					stroke,
					strokeWidth,
					opacity,
					strokeDasharray
				} = this.props
				const { yValue } = this.props

				const lineCoordinates = getLineCoordinates(yScale, yValue, width)
				const textCoordinates = getTextCoordinates(
					symbol,
					yScale,
					yValue,
					width
				)
				const stopLossOrTakeProfit =
					stopOrderType === 'sl' ? 'stop loss' : 'take profit'

				return /*#__PURE__*/ _react.default.createElement(
					_react.default.Fragment,
					null,
					/*#__PURE__*/ _react.default.createElement(
						'text',
						_extends(
							{
								className: className,
								strokeDasharray: (0, _utils.getStrokeDasharray)(
									strokeDasharray
								),
								stroke: stroke,
								strokeWidth: strokeWidth,
								strokeOpacity: opacity
							},
							textCoordinates
						),
						stopLossOrTakeProfit,
						' (',
						distanceInPips,
						')'
					),
					/*#__PURE__*/ _react.default.createElement(
						'line',
						_extends(
							{
								className: className,
								strokeDasharray: (0, _utils.getStrokeDasharray)(
									strokeDasharray
								),
								stroke: stroke,
								strokeWidth: strokeWidth,
								strokeOpacity: opacity
							},
							lineCoordinates
						)
					)
				)
			}
		}
	])

	return StopOrder
})(_react.Component)

function getLineCoordinates(yScale, yValue, width) {
	return {
		x1: 0,
		y1: Math.round(yScale(yValue)),
		x2: width,
		y2: Math.round(yScale(yValue))
	}
}

function getTextCoordinates(symbol, yScale, yValue, width) {
	let verticalOffset = 0 // TODO: add later values for stocks, cryptocurrencies

	if (symbol.includes('JPY')) {
		verticalOffset = yValue * 0.00005
	} else {
		verticalOffset = yValue * 0.000135
	}

	return {
		x: 0.85 * width,
		y: Math.round(yScale(yValue + verticalOffset))
	}
}

function getDistanceInPips(
	symbol,
	orderType,
	stopOrderType,
	marketOrPendingPrice,
	yValue
) {
	let distanceInPips = 0
	let digitsAfterPoint = 5

	if (symbol.includes('JPY')) digitsAfterPoint = 3

	const multiplier = Math.pow(10, digitsAfterPoint)

	if (
		(orderType === 'buy' && stopOrderType === 'sl') ||
		(orderType === 'sell' && stopOrderType === 'tp')
	) {
		const diff = marketOrPendingPrice - yValue
		distanceInPips = Number((multiplier * diff).toFixed(0))

		return distanceInPips
	} else if (
		(orderType === 'buy' && stopOrderType === 'tp') ||
		(orderType === 'sell' && stopOrderType === 'sl')
	) {
		const diff = yValue - marketOrPendingPrice
		distanceInPips = Number((multiplier * diff).toFixed(0))

		return distanceInPips
	}
}

StopOrder.propTypes = {
	className: _propTypes2.default.string,
	type: _propTypes2.default.oneOf(['vertical', 'horizontal']).isRequired,
	stopOrderType: _propTypes2.default.oneOf(['sl', 'tp']).isRequired,
	orderType: _propTypes2.default.oneOf(['buy', 'sell']).isRequired,
	marketOrPendingPrice: _propTypes2.default.number.isRequired,
	symbol: _propTypes2.default.string.isRequired,
	stroke: _propTypes2.default.string,
	strokeWidth: _propTypes2.default.number,
	strokeDasharray: _propTypes2.default.oneOf(_utils.strokeDashTypes),
	opacity: _propTypes2.default.number.isRequired,
	yValue: function yValue(props, propName /* , componentName */) {
		if (props.type === 'vertical' && (0, _utils.isDefined)(props[propName]))
			return new Error(
				'Do not define `yValue` when type is `vertical`, define the `xValue` prop'
			)
		if (
			props.type === 'horizontal' &&
			(0, _utils.isNotDefined)(props[propName])
		)
			return new Error('when type = `horizontal` `yValue` is required')
		// if (isDefined(props[propName]) && typeof props[propName] !== "number") return new Error("prop `yValue` accepts a number");
	},
	xValue: function xValue(props, propName /* , componentName */) {
		if (props.type === 'horizontal' && (0, _utils.isDefined)(props[propName]))
			return new Error(
				'Do not define `xValue` when type is `horizontal`, define the `yValue` prop'
			)
		if (props.type === 'vertical' && (0, _utils.isNotDefined)(props[propName]))
			return new Error('when type = `vertical` `xValue` is required')
		// if (isDefined(props[propName]) && typeof props[propName] !== "number") return new Error("prop `xValue` accepts a number");
	},
	yAccessor: _propTypes2.default.func.isRequired
}

StopOrder.defaultProps = {
	className: 'line ',
	type: 'horizontal',
	stopOrderType: 'sl',
	orderType: 'buy',
	marketOrPendingPrice: 0,
	symbol: 'EURUSD',
	stroke: '#000000',
	opacity: 0.5,
	strokeWidth: 1,
	strokeDasharray: 'Solid'
}

exports.default = StopOrder
//# sourceMappingURL=StopOrder.js.map
