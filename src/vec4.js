/*
 * 4D vector
 */
m3d.Vec4 = function( x, y, z, w ) {
	if( this instanceof m3d.Vec4) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		this.w = w || 0;
	}
	else {
		return new m3d.Vec4( x, y, z, w );
	}
};

m3d.Vec4.prototype = {
	add: function( v ) {
		return new m3d.Vec4(
			this.x + v.x,
			this.y + v.y,
			this.z + v.z,
			this.w + v.w
		);
	},

	subtract: function( v ) {
		return new m3d.Vec4(
			this.x - v.x,
			this.y - v.y,
			this.z - v.z,
			this.w - v.w
		);
	},

	multiply: function( s ) {
		return new m3d.Vec4(
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
		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );
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
		let dot_product = this.dotProduct( v );
		let a_length    = this.magnitude( );
		let b_length    = v.magnitude( );

		return Math.acos( dot_product / ( a_length * b_length ) );
	},

	normalize: function( ) {
		let inverse_length = 1.0 / this.magnitude();
		this.x *= inverse_length;
		this.y *= inverse_length;
		this.z *= inverse_length;
		this.w *= inverse_length;
		return this;
	},

	isNormalized: function( ) {
		let length = this.magnitude();
		return (Math.abs(length - 1.0) < Number.EPSILON);
	},

	negate: function( ) {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
		this.w = -this.w;
		return this;
	},

	zero: function( ) {
		this.x = 0.0;
		this.y = 0.0;
		this.z = 0.0;
		this.w = 0.0;
		return this;
	},

	lerp: function( a, b, s ) {
		return new m3d.Vec4(
			m3d.lerp( s, a.x, b.x ),
			m3d.lerp( s, a.y, b.y ),
			m3d.lerp( s, a.z, b.z ),
			m3d.lerp( s, a.w, b.w )
		);
	},

	maxComponent: function( v ) {
		return Math.max( Math.max( Math.max(v.x, v.y), v.z ), v.w );
	},

	minComponent: function( v ) {
		return Math.min( Math.min( Math.min(v.x, v.y), v.z ), v.w );
	},

	toString: function( ) {
		return "(" + m3d.format(this.x) + ", " + m3d.format(this.y) + ", " + m3d.format(this.z) + ", " + m3d.format(this.w) + ")";
	},
};

m3d.Vec4.ZERO = (function() {
	let z = new m3d.Vec4( 0, 0, 0, 0 );
	Object.freeze( z );
	return z;
}());

m3d.Vec4.ONE = (function() {
	let z = new m3d.Vec4( 1, 1, 1, 1 );
	Object.freeze( z );
	return z;
}());

m3d.Vec4.XUNIT = (function() {
	let x = new m3d.Vec4( 1, 0, 0, 0 );
	Object.freeze( x );
	return x;
}());

m3d.Vec4.YUNIT = (function() {
	let y = new m3d.Vec4( 0, 1, 0, 0 );
	Object.freeze( y );
	return y;
}());

m3d.Vec4.ZUNIT = (function() {
	let z = new m3d.Vec4( 0, 0, 1, 0 );
	Object.freeze( z );
	return z;
}());

m3d.Vec4.WUNIT = (function() {
	let w = new m3d.Vec4( 0, 0, 0, 1 );
	Object.freeze( w );
	return w;
}());
