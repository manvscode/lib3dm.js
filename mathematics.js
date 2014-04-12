var 3dmath = {
    SCALAR_EPSILON: 1e-9,
	HALF_PI: Math.PI / 2.0,
	PI: Math.PI,
	TWO_PI: 2 * Math.PI,
	RADIANS_PER_DEGREE: (Math.PI / 180.0),
	DEGREES_PER_RANDIAN:   (180.0 / Math.PI),

	to_radians: function(degrees) { return degrees * RADIANS_PER_DEGREE; },
	to_degrees: function(radians) { return radians * DEGREES_PER_RANDIAN; },
	integer_max: function(x, y) { return (x) ^ (((x) ^ (y)) & -((x) < (y))); },
	integer_min: function(x, y) { return (y) ^ (((x) ^ (y)) & -((x) < (y))); },
	linear_interpolation: function(a, x0, x1) { return (x0) + (a) * ((x1) - (x0)); },
	lerp: this.linear_interpolation,
	bilear_interpolation: function(a, b, x0, x1, x2, x3) { return this.lerp( b, this.lerp( a, x0, x1 ), this.lerp( a, x2, x3 ) ); },
	bilerp: this.bilear_interpolation,
	uniform: function() { return Math.random(); },
	uniform_range: function(min, max) { var diff = max - min; return min + this.uniform() * diff; },
	uniform_unit: function() { return 2 * this.uniform() - 1; },
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
