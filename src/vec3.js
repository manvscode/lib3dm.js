/*
 * 3D vector
 */
m3d.Vec3 = function( x, y, z ) {
	if( this instanceof m3d.Vec3) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
	}
	else {
		return new m3d.Vec3( x, y, z );
	}
};

m3d.Vec3.prototype = {
	add: function( v ) {
		return new m3d.Vec3( this.x + v.x, this.y + v.y, this.z + v.z );
	},

	subtract: function( v ) {
		return new m3d.Vec3( this.x - v.x, this.y - v.y, this.z - v.z );
	},

	multiply: function( s ) {
		return new m3d.Vec3( this.x * s, this.y * s, this.z * s );
	},

	scale: function( s ) {
		return this.multiply( s );
	},

	dotProduct: function( v ) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	},

	crossProduct: function( v ) {
		return new m3d.Vec3(
			this.y * v.z - this.z * v.y,
			this.z * v.x - this.x * v.z,
			this.x * v.y - this.y * v.x
		);
	},

	magnitude: function( ) {
		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
	},

	distance: function( v ) {
		return Math.sqrt(
			(this.x - v.x) * (this.x - v.x) +
			(this.y - v.y) * (this.y - v.y) +
			(this.z - v.z) * (this.z - v.z)
		);
	},

	angle: function( v ) {
		let dot_product = this.dotProduct( v );
		let a_length    = this.magnitude( );
		let b_length    = v.magnitude( );

		return Math.acos( dot_product / ( a_length * b_length ) );
	},

	normalize: function( ) {
		let length = this.magnitude();
		if( length > 0.0 ) {
			this.x /= length;
			this.y /= length;
			this.z /= length;
		}
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
		return this;
	},

	zero: function( ) {
		this.x = 0.0;
		this.y = 0.0;
		this.z = 0.0;
		return this;
	},

	lerp: function( a, b, s ) {
		return new m3d.Vec3(
			m3d.lerp( s, a.x, b.x ),
			m3d.lerp( s, a.y, b.y ),
			m3d.lerp( s, a.z, b.z )
		);
	},

	maxComponent: function( v ) {
		return Math.max( Math.max(v.x, v.y), v.z );
	},

	minComponent: function( v ) {
		return Math.min( Math.min(v.x, v.y), v.z );
	},

	toString: function( ) {
		return "(" + m3d.format(this.x) + ", " + m3d.format(this.y) + ", " + m3d.format(this.z) + ")";
	},
};

m3d.Vec3.ZERO = (function() {
	let z = new m3d.Vec3( 0, 0, 0 );
	Object.freeze( z );
	return z;
}());

m3d.Vec3.ONE = (function() {
	let z = new m3d.Vec3( 1, 1, 1 );
	Object.freeze( z );
	return z;
}());

m3d.Vec3.XUNIT = (function() {
	let x = new m3d.Vec3( 1, 0, 0 );
	Object.freeze( x );
	return x;
}());

m3d.Vec3.YUNIT = (function() {
	let y = new m3d.Vec3( 0, 1, 0 );
	Object.freeze( y );
	return y;
}());

m3d.Vec3.ZUNIT = (function() {
	let z = new m3d.Vec3( 0, 0, 1 );
	Object.freeze( z );
	return z;
}());
