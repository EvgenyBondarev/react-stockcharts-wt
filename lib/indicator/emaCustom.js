"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var base = (0, _baseIndicator2.default)().accessor(function (d) {
		return d.ema;
  });
  
  var underlyingAlgorithm = function(data) { return data }

	var indicator = function indicator(data) {
		return underlyingAlgorithm(data);
	};

	(0, _utils.rebind)(indicator, base, "id", "accessor", "stroke", "fill", "echo", "type");

	return indicator;
};

var _utils = require("react-stockcharts/lib/utils");

var _baseIndicator = require("react-stockcharts/lib/indicator/baseIndicator");

var _baseIndicator2 = _interopRequireDefault(_baseIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=ema.js.map