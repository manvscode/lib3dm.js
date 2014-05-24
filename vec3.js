
/*
 * vec3 -- 3D vector
 */
function vec3( x, y, z ) {
	this.x = x;
	this.y = y;
	this.z = z;
}

vec3.VEC3_ZERO  = vec3( 0, 0, 0 );
vec3.VEC3_XUNIT = vec3( 1, 0, 0 );
vec3.VEC3_YUNIT = vec3( 0, 1, 0 );
vec3.VEC3_ZUNIT = vec3( 0, 0, 1 );

vec3.prototype.add = function( v ) {
	return new vec3( this.x + v.x, this.y + v.y, this.z + v.z );
};

vec3.prototype.subtract = function( v ) {
	return new vec3( this.x - v.x, this.y - v.y, this.z - v.z );
};

vec3.prototype.multiply = function( s ) {
	return new vec3( this.x * s, this.y * s, this.z * s );
};

vec3.prototype.scale = function( s ) {
	return this.multiply( s );
};

vec3.prototype.dot_product = function( v ) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
};

vec3.prototype.cross_product = function( v ) {
	return new vec3(
		this.y * v.z - this.z * v.y,
		this.z * v.x - this.x * v.z,
		this.x * v.y - this.y * v.x
	);
};

vec3.prototype.magnitude = function( ) {
    return Math.sqrt( this.x * this.x + this.y * this.y + this.z * v.z );
};

vec3.prototype.distance = function( v ) {
    return Math.sqrt(
		(this.x - v.x) * (this.x - v.x) +
		(this.y - v.y) * (this.y - v.y) +
		(this.z - v.z) * (this.z - v.z)
	);
};

vec3.prototype.angle = function( v ) {
    var dot_product = this.dot_product( v );
    var a_length    = this.magnitude( );
    var b_length    = v.magnitude( );

    return Math.acos( dot_product / ( a_length * b_length ) );
};

vec3.prototype.normalize = function( ) {
    var inverse_length = 1.0 / this.magnitude();
    this.x *= inverse_length;
    this.y *= inverse_length;
    this.z *= inverse_length;
};

vec3.prototype.is_normalized = function( ) {
    return (Math.abs(this.x - 1.0) < mathematics.SCALAR_EPSILON) &&
           (Math.abs(this.y - 1.0) < mathematics.SCALAR_EPSILON) &&
           (Math.abs(this.z - 1.0) < mathematics.SCALAR_EPSILON);
};

vec3.prototype.negate = function( ) {
	this.x = -this.x;
	this.y = -this.y;
	this.z = -this.z;
};

vec3.prototype.zero = function( ) {
	this.x = 0.0;
	this.y = 0.0;
	this.z = 0.0;
};

vec3.prototype.toString = function( ) {
	return "(" + this.x + ", " + this.y + ", " + this.z + ")";
};

