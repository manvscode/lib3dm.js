"use strict";
var lib3dmath = (function() {
	var M = {
		toRadians: function(degrees) { return degrees * this.RADIANS_PER_DEGREE; },
		toDegrees: function(radians) { return radians * this.DEGREES_PER_RANDIAN; },
		integerMax: function(x, y) { return (x) ^ (((x) ^ (y)) & -((x) < (y))); },
		integerMin: function(x, y) { return (y) ^ (((x) ^ (y)) & -((x) < (y))); },
		lerp: function(a, x0, x1) { return (x0) + (a) * ((x1) - (x0)); },
		bilerp: function(a, b, x0, x1, x2, x3) { return this.lerp( b, this.lerp( a, x0, x1 ), this.lerp( a, x2, x3 ) ); },
		uniform: function() { return Math.random(); },
		uniformRange: function(min, max) { var diff = max - min; return min + this.uniform() * diff; },
		uniformUnit: function() { return 2 * this.uniform() - 1; },
		clamp: function(x, min, max) { return Math.min( Math.max(x, min), max ); },
	};


	Object.defineProperties( M, {
		VERSION: {
			value: "1.0",
			writable: false,
			enumerable: true,
			configurable: false,
		},
		SCALAR_EPSILON: {
			value: Math.EPSILON,
			writable: false,
			enumerable: true,
			configurable: true,
		},
		HALF_PI: {
			value: Math.PI / 2.0,
			writable: false,
			enumerable: true,
			configurable: true,
		},
		PI: {
			value: Math.PI,
			writable: false,
			enumerable: true,
			configurable: true,
		},
		TWO_PI: {
			value: 2 * Math.PI,
			writable: false,
			enumerable: true,
			configurable: true,
		},
		RADIANS_PER_DEGREE: {
			value: (Math.PI / 180.0),
			writable: false,
			enumerable: true,
			configurable: true,
		},
		DEGREES_PER_RANDIAN: {
			value: (180.0 / Math.PI),
			writable: false,
			enumerable: true,
			configurable: true,
		},
	});

	return M;
}());
