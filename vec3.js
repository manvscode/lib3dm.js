
/*
 * 3D vector
 */
function Vec3( x, y, z ) {
	if( this instanceof Vec3 ) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
	else {
		return new Vec3( x, y, z );
	}
}

Vec3.ZERO = (function() {
	var z = new Vec3( 0, 0, 0 );
	Object.freeze( z );
	return z;
}());

Vec3.XUNIT = (function() {
	var x = new Vec3( 1, 0, 0 );
	Object.freeze( x );
	return x;
}());

Vec3.YUNIT = (function() {
	var y = new Vec3( 0, 1, 0 );
	Object.freeze( y );
	return y;
}());

Vec3.ZUNIT = (function() {
	var z = new Vec3( 0, 0, 1 );
	Object.freeze( z );
	return z;
}());

Vec3.prototype.add = function( v ) {
	return new Vec3( this.x + v.x, this.y + v.y, this.z + v.z );
};

Vec3.prototype.subtract = function( v ) {
	return new Vec3( this.x - v.x, this.y - v.y, this.z - v.z );
};

Vec3.prototype.multiply = function( s ) {
	return new Vec3( this.x * s, this.y * s, this.z * s );
};

Vec3.prototype.scale = function( s ) {
	return this.multiply( s );
};

Vec3.prototype.dotProduct = function( v ) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
};

Vec3.prototype.crossProduct = function( v ) {
	return new Vec3(
		this.y * v.z - this.z * v.y,
		this.z * v.x - this.x * v.z,
		this.x * v.y - this.y * v.x
	);
};

Vec3.prototype.magnitude = function( ) {
    return Math.sqrt( this.x * this.x + this.y * this.y + this.z * v.z );
};

Vec3.prototype.distance = function( v ) {
    return Math.sqrt(
		(this.x - v.x) * (this.x - v.x) +
		(this.y - v.y) * (this.y - v.y) +
		(this.z - v.z) * (this.z - v.z)
	);
};

Vec3.prototype.angle = function( v ) {
    var dot_product = this.dotProduct( v );
    var a_length    = this.magnitude( );
    var b_length    = v.magnitude( );

    return Math.acos( dot_product / ( a_length * b_length ) );
};

Vec3.prototype.normalize = function( ) {
    var inverse_length = 1.0 / this.magnitude();
    this.x *= inverse_length;
    this.y *= inverse_length;
    this.z *= inverse_length;
};

Vec3.prototype.isNormalized = function( ) {
    return (Math.abs(this.x - 1.0) < Math.EPSILON) &&
           (Math.abs(this.y - 1.0) < Math.EPSILON) &&
           (Math.abs(this.z - 1.0) < Math.EPSILON);
};

Vec3.prototype.negate = function( ) {
	this.x = -this.x;
	this.y = -this.y;
	this.z = -this.z;
};

Vec3.prototype.zero = function( ) {
	this.x = 0.0;
	this.y = 0.0;
	this.z = 0.0;
};

Vec3.prototype.toString = function( ) {
	return "(" + this.x + ", " + this.y + ", " + this.z + ")";
};

