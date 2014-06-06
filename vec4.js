
/*
 * 4D vector
 */
function Vec4( x, y, z, w ) {
	if( this instanceof Vec4 ) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		this.w = w || 0;
	}
	else {
		return new Vec4( x, y, z, w );
	}
}

Vec4.ZERO = (function() {
	var z = new Vec4( 0, 0, 0, 0 );
	Object.freeze( z );
	return z;
}());

Vec4.XUNIT = (function() {
	var x = new Vec4( 1, 0, 0, 0 );
	Object.freeze( x );
	return x;
}());

Vec4.YUNIT = (function() {
	var y = new Vec4( 0, 1, 0, 0 );
	Object.freeze( y );
	return y;
}());

Vec4.ZUNIT = (function() {
	var z = new Vec4( 0, 0, 1, 0 );
	Object.freeze( z );
	return z;
}());

Vec4.WUNIT = (function() {
	var w = new Vec4( 0, 0, 0, 1 );
	Object.freeze( w );
	return w;
}());

Vec4.prototype.add = function( v ) {
	return new Vec4( 
		this.x + v.x, 
		this.y + v.y, 
		this.z + v.z,
		this.w + v.w
	);
};

Vec4.prototype.subtract = function( v ) {
	return new Vec4(
		this.x - v.x, 
		this.y - v.y, 
		this.z - v.z,
		this.w - v.w
	);
};

Vec4.prototype.multiply = function( s ) {
	return new Vec4(
		this.x * s,
		this.y * s,
		this.z * s,
		this.w * s
	);
};

Vec4.prototype.scale = function( s ) {
	return this.multiply( s );
};

Vec4.prototype.dotProduct = function( v ) {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
};

Vec4.prototype.magnitude = function( ) {
    return Math.sqrt( this.x * this.x + this.y * this.y + this.z * v.z + this.w * v.w );
};

Vec4.prototype.distance = function( v ) {
    return Math.sqrt(
		(this.x - v.x) * (this.x - v.x) +
		(this.y - v.y) * (this.y - v.y) +
		(this.z - v.z) * (this.z - v.z) +
		(this.w - v.w) * (this.w - v.w)
	);
};

Vec4.prototype.angle = function( v ) {
    var dot_product = this.dotProduct( v );
    var a_length    = this.magnitude( );
    var b_length    = v.magnitude( );

    return Math.acos( dot_product / ( a_length * b_length ) );
};

Vec4.prototype.normalize = function( ) {
    var inverse_length = 1.0 / this.magnitude();
    this.x *= inverse_length;
    this.y *= inverse_length;
    this.z *= inverse_length;
    this.w *= inverse_length;
};

Vec4.prototype.isNormalized = function( ) {
    return (Math.abs(this.x - 1.0) < Math.EPSILON) &&
           (Math.abs(this.y - 1.0) < Math.EPSILON) &&
           (Math.abs(this.z - 1.0) < Math.EPSILON) &&
           (Math.abs(this.w - 1.0) < Math.EPSILON);
};

Vec4.prototype.negate = function( ) {
	this.x = -this.x;
	this.y = -this.y;
	this.z = -this.z;
	this.w = -this.w;
};

Vec4.prototype.zero = function( ) {
	this.x = 0.0;
	this.y = 0.0;
	this.z = 0.0;
	this.w = 0.0;
};

Vec4.prototype.toString = function( ) {
	return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
};

