
/*
 * 2D vector
 */
function Vec2( x, y ) {
	if( this instanceof Vec2 ) {
		this.x = x;
		this.y = y;
	}
	else {
		return new Vec2( x, y );
	}
}

Vec2.ZERO = (function() {
	var z = new Vec2( 0, 0 );
	Object.freeze( z );
	return z;
}());

Vec2.XUNIT = (function() {
	var x = new Vec2( 1, 0 );
	Object.freeze( x );
	return x;
}());

Vec2.YUNIT = (function() {
	var y = new Vec2( 0, 1 );
	Object.freeze( y );
	return y;
}());

Vec2.prototype.add = function( v ) {
	return new Vec2( this.x + v.x, this.y + v.y );
};

Vec2.prototype.subtract = function( v ) {
	return new Vec2( this.x - v.x, this.y - v.y );
};

Vec2.prototype.multiply = function( s ) {
	return new Vec2( this.x * s, this.y * s );
};

Vec2.prototype.scale = function( s ) {
	return this.multiply( s );
};

Vec2.prototype.dotProduct = function( v ) {
    return this.x * v.x + this.y * v.y;
};

Vec2.prototype.crossProduct = function( v ) {
	return new Vec2( this.y, -this.x );
};

Vec2.prototype.determinant = function( v ) {
    return this.x * v.y - v.x * this.y;
};

Vec2.prototype.magnitude = function( ) {
    return Math.sqrt( this.x * this.x + this.y * this.y );
};

Vec2.prototype.distance = function( v ) {
    return Math.sqrt(
		(this.x - v.x) * (this.x - v.x) +
		(this.y - v.y) * (this.y - v.y)
	);
};

Vec2.prototype.angle = function( v ) {
    var dot_product = this.dot_product( v );
    var a_length    = this.magnitude( );
    var b_length    = v.magnitude( );
    return Math.acos( dot_product / ( a_length * b_length ) );
};

Vec2.prototype.normalize = function( ) {
    var inverse_length = 1.0 / this.magnitude();
    this.x *= inverse_length;
    this.y *= inverse_length;
};

Vec2.prototype.isNormalized = function( ) {
    return (Math.abs(this.x - 1.0) < Math.EPSILON) &&
           (Math.abs(this.y - 1.0) < Math.EPSILON);
};

Vec2.prototype.negate = function( ) {
	this.x = -this.x;
	this.y = -this.y;
};

Vec2.prototype.zero = function( ) {
	this.x = 0.0;
	this.y = 0.0;
};

Vec2.prototype.toString = function( ) {
	return "(" + this.x + ", " + this.y + ")";
};

