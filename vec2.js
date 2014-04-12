
/*
 * vec2 -- 2D vector
 */
function vec2( x, y ) {
	this.x = x;
	this.y = y;
}
vec2.VEC2_ZERO  = vec2( 0, 0 );
vec2.VEC2_XUNIT = vec2( 1, 0 );
vec2.VEC2_YUNIT = vec2( 0, 1 );
/*
vec2.VEC2_ZERO = function( v ) {
	return new vec2( 0, 0 );
}
vec2.VEC2_XUNIT = function( v ) {
	return new vec2( 1, 0 );
}
vec2.VEC2_YUNIT = function( v ) {
	return new vec2( 0, 1 );
}
*/
vec2.prototype.add = function( v ) {
	return new vec2( this.x + v.x, this.y + v.y );
};
vec2.prototype.subtract = function( v ) {
	return new vec2( this.x - v.x, this.y - v.y );
};
vec2.prototype.multiply = function( s ) {
	return new vec2( this.x * s, this.y * s );
};
vec2.prototype.scale = function( s ) {
	return this.multiply( s );
};
vec2.prototype.dot_product = function( v ) {
    return this.x * v.x + this.y * v.y;
};
vec2.prototype.cross_product = function( v ) {
	return new vec2( this.y, -this.x );
};
vec2.prototype.determinant = function( v ) {
    return this.x * v.y - v.x * this.y;
};
vec2.prototype.magnitude = function( ) {
    return Math.sqrt( this.x * this.x + this.y * this.y );
};
vec2.prototype.distance = function( v ) {
    return Math.sqrt(
		(this.x - v.x) * (this.x - v.x) +
		(this.y - v.y) * (this.y - v.y)
	);
};
vec2.prototype.angle = function( v ) {
    var dot_product = this.dot_product( v );
    var a_length    = this.magnitude( );
    var b_length    = v.magnitude( );

    return Math.acos( dot_product / ( a_length * b_length ) );
}
vec2.prototype.normalize = function( ) {
    scaler_t inverse_length = 1.0 / this.magnitude();
    this.x *= inverse_length;
    this.y *= inverse_length;
}
vec2.prototype.is_normalized = function( ) {
    return (Math.abs(this.x - 1.0) < 3dmath.SCALAR_EPSILON) &&
           (Math.abs(this.y - 1.0) < 3dmath.SCALAR_EPSILON);
}
vec2.prototype.negate = function( v ) {
	this.x = -this.x;
	this.y = -this.y;
};
vec2.prototype.zero = function( ) {
	this.x = 0.0;
	this.y = 0.0;
};
vec2.prototype.toString = function( ) {
	return "(" + this.x + ", " + this.y + ")";
};

