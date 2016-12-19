/*
 * 4D vector
 */
lib3dmath.Vec4 = function( x, y, z, w ) {
	if( this instanceof lib3dmath.Vec4) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		this.w = w || 0;
	}
	else {
		return new lib3dmath.Vec4( x, y, z, w );
	}
};

lib3dmath.Vec4.prototype = {
	add: function( v ) {
		return new lib3dmath.Vec4(
			this.x + v.x,
			this.y + v.y,
			this.z + v.z,
			this.w + v.w
		);
	},

	subtract: function( v ) {
		return new lib3dmath.Vec4(
			this.x - v.x,
			this.y - v.y,
			this.z - v.z,
			this.w - v.w
		);
	},

	multiply: function( s ) {
		return new lib3dmath.Vec4(
			this.x * s,
			this.y * s,
			this.z * s,
			this.w * s
		);
	},

	scale: function( s ) {
		return this.multiply( s );
	},

	dotProduct: function( v ) {
		return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
	},

	magnitude: function( ) {
		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * v.z + this.w * v.w );
	},

	distance: function( v ) {
		return Math.sqrt(
			(this.x - v.x) * (this.x - v.x) +
			(this.y - v.y) * (this.y - v.y) +
			(this.z - v.z) * (this.z - v.z) +
			(this.w - v.w) * (this.w - v.w)
		);
	},

	angle: function( v ) {
		var dot_product = this.dotProduct( v );
		var a_length    = this.magnitude( );
		var b_length    = v.magnitude( );

		return Math.acos( dot_product / ( a_length * b_length ) );
	},

	normalize: function( ) {
		var inverse_length = 1.0 / this.magnitude();
		this.x *= inverse_length;
		this.y *= inverse_length;
		this.z *= inverse_length;
		this.w *= inverse_length;
	},

	isNormalized: function( ) {
		return (Math.abs(this.x - 1.0) < Math.EPSILON) &&
			   (Math.abs(this.y - 1.0) < Math.EPSILON) &&
			   (Math.abs(this.z - 1.0) < Math.EPSILON) &&
			   (Math.abs(this.w - 1.0) < Math.EPSILON);
	},

	negate: function( ) {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
		this.w = -this.w;
	},

	zero: function( ) {
		this.x = 0.0;
		this.y = 0.0;
		this.z = 0.0;
		this.w = 0.0;
	},

	lerp: function( a, b, s ) {
		return new lib3dmath.Vec4(
			lib3dmath.lerp( s, a.x, b.x ),
			lib3dmath.lerp( s, a.y, b.y ),
			lib3dmath.lerp( s, a.z, b.z ),
			lib3dmath.lerp( s, a.w, b.w )
		);
	},

	maxComponent: function( v ) {
		return Math.max( Math.max( Math.max(v.x, v.y), v.z ), v.w );
	},

	minComponent: function( v ) {
		return Math.min( Math.min( Math.min(v.x, v.y), v.z ), v.w );
	},

	toString: function( ) {
		return "(" + lib3dmath.format(this.x) + ", " + lib3dmath.format(this.y) + ", " + lib3dmath.format(this.z) + ", " + lib3dmath.format(this.w) + ")";
	},
};

lib3dmath.Vec4.ZERO = (function() {
	var z = new lib3dmath.Vec4( 0, 0, 0, 0 );
	Object.freeze( z );
	return z;
}());

lib3dmath.Vec4.ONE = (function() {
	var z = new lib3dmath.Vec4( 1, 1, 1, 1 );
	Object.freeze( z );
	return z;
}());

lib3dmath.Vec4.XUNIT = (function() {
	var x = new lib3dmath.Vec4( 1, 0, 0, 0 );
	Object.freeze( x );
	return x;
}());

lib3dmath.Vec4.YUNIT = (function() {
	var y = new lib3dmath.Vec4( 0, 1, 0, 0 );
	Object.freeze( y );
	return y;
}());

lib3dmath.Vec4.ZUNIT = (function() {
	var z = new lib3dmath.Vec4( 0, 0, 1, 0 );
	Object.freeze( z );
	return z;
}());

lib3dmath.Vec4.WUNIT = (function() {
	var w = new lib3dmath.Vec4( 0, 0, 0, 1 );
	Object.freeze( w );
	return w;
}());
