
/*
 * vec4 -- 4D vector
 */
function vec4( x, y, z, w ) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
}
vec4.VEC3_ZERO  = vec4( 0, 0, 0, 0 );
vec4.VEC3_XUNIT = vec4( 1, 0, 0, 0 );
vec4.VEC3_YUNIT = vec4( 0, 1, 0, 0 );
vec4.VEC3_ZUNIT = vec4( 0, 0, 1, 0 );
vec4.VEC3_WUNIT = vec4( 0, 0, 0, 1 );
vec4.prototype.add = function( v ) {
	return new vec4( 
		this.x + v.x, 
		this.y + v.y, 
		this.z + v.z,
		this.w + v.w
	);
};
vec4.prototype.subtract = function( v ) {
	return new vec4(
		this.x - v.x, 
		this.y - v.y, 
		this.z - v.z,
		this.w - v.w
	);
};
vec4.prototype.multiply = function( s ) {
	return new vec4(
		this.x * s,
		this.y * s,
		this.z * s,
		this.w * s
	);
};
vec4.prototype.scale = function( s ) {
	return this.multiply( s );
};
vec4.prototype.dot_product = function( v ) {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
};
vec4.prototype.magnitude = function( ) {
    return Math.sqrt( this.x * this.x + this.y * this.y + this.z * v.z + this.w * v.w );
};
vec4.prototype.distance = function( v ) {
    return Math.sqrt(
		(this.x - v.x) * (this.x - v.x) +
		(this.y - v.y) * (this.y - v.y) +
		(this.z - v.z) * (this.z - v.z) +
		(this.w - v.w) * (this.w - v.w)
	);
};
vec4.prototype.angle = function( v ) {
    var dot_product = this.dot_product( v );
    var a_length    = this.magnitude( );
    var b_length    = v.magnitude( );

    return Math.acos( dot_product / ( a_length * b_length ) );
}
vec4.prototype.normalize = function( ) {
    scaler_t inverse_length = 1.0 / this.magnitude();
    this.x *= inverse_length;
    this.y *= inverse_length;
    this.z *= inverse_length;
    this.w *= inverse_length;
}
vec4.prototype.is_normalized = function( ) {
    return (Math.abs(this.x - 1.0) < 3dmath.SCALAR_EPSILON) &&
           (Math.abs(this.y - 1.0) < 3dmath.SCALAR_EPSILON) &&
           (Math.abs(this.z - 1.0) < 3dmath.SCALAR_EPSILON) &&
           (Math.abs(this.w - 1.0) < 3dmath.SCALAR_EPSILON);
}
vec4.prototype.negate = function( v ) {
	this.x = -this.x;
	this.y = -this.y;
	this.z = -this.z;
	this.w = -this.w;
};
vec4.prototype.zero = function( ) {
	this.x = 0.0;
	this.y = 0.0;
	this.z = 0.0;
	this.w = 0.0;
};
vec4.prototype.toString = function( ) {
	return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
};

