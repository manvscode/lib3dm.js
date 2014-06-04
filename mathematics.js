var Mathematics = (function() {
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
		/*
		guassian: function(mean, stddev) {

			if( guassian.spare_ready )
			{
				guassian.spare_ready = false;
				return mean + stddev * guassian.spare;
			}
			else
			{
				var ux = 0.0;
				var uy = 0.0;
				var s = 0.0;

				do {
					ux = this.uniform_unit( );
					uy = this.uniform_unit( );
					s = ux * ux + uy * uy;
				} while( s >= 1.0 || s <= 0.0 );

				var mul = Math.sqrt( -2.0f * Math.log(s) / s );

				guassian.spare = uy * mul;
				guassian.spare_ready = true;

				return mean + stddev * ux * mul;
			}
		},
		*/
		clamp: function(value, min, max) {
			if( value > max )
			{
				return max;
			}
			else if( value < min )
			{
				return min;
			}

			return value;
		}
	};

	Object.defineProperties( M, {
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
		Vector2: {
			value: Vec2,
			writable: false,
			enumerable: true,
			configurable: true,
		},
		Vector3: {
			value: Vec3,
			writable: false,
			enumerable: true,
			configurable: true,
		},
		Vector4: {
			value: Vec4,
			writable: false,
			enumerable: true,
			configurable: true,
		},
		Matrix2: {
			value: Mat2,
			writable: false,
			enumerable: true,
			configurable: true,
		},
		Matrix3: {
			value: Mat3,
			writable: false,
			enumerable: true,
			configurable: true,
		},
		Matrix4: {
			value: Mat4,
			writable: false,
			enumerable: true,
			configurable: true,
		},
		Quaternion: {
			value: Quat,
			writable: false,
			enumerable: true,
			configurable: true,
		},
	});

	return M;
}());
