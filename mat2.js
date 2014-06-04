/*
 * 2D matrix
 */
function Mat2( a, b, c, d ) {
	if( this instanceof Mat2 ) {
		this.m = [a, b,
				  c, d];
	}
	else {
		return new Mat2( a, b, c, d );
	}
}

Mat2.IDENTITY = (function() {
	var i = new Mat2( 1, 0,
	                  0, 1 );
	Object.freeze( i );
	return i;
}());

Mat2.ZERO = (function() {
	var z = new Mat2( 0, 0,
	                  0, 0 );
	Object.freeze( z );
	return z;
}());

Mat2.prototype.identity = function( ) {
	return this.m = Mat2.IDENITY;
};

Mat2.prototype.zero = function( ) {
	return this.m = Mat2.ZERO;
};

Mat2.prototype.determinant = function( ) {
	return this.m[ 0 ] * this.m[ 3 ] - this.m[ 1 ] * this.m[ 2 ];
};

Mat2.prototype.multiplyMatrix = function( m ) {
	return new Mat2( 
		this.m[ 0 ] * m.m[ 0 ] + this.m[ 2 ] * m.m[ 1 ],
		this.m[ 1 ] * m.m[ 0 ] + this.m[ 3 ] * m.m[ 1 ],
		this.m[ 0 ] * m.m[ 2 ] + this.m[ 2 ] * m.m[ 3 ],
		this.m[ 1 ] * m.m[ 2 ] + this.m[ 3 ] * m.m[ 3 ]
	);
};

Mat2.prototype.multiplyVector = function( v ) {
	return new Vec2( 
		this.m[ 0 ] * v.x + this.m[ 2 ] * v.y,
		this.m[ 1 ] * v.x + this.m[ 3 ] * v.y
	);
};

Mat2.prototype.multiply = function( o ) {
	if( o instanceof Vec2 ) {
		return this.multiplyVector( o );
	}
	else {
		return this.multiplyMatrix( o );
	}
};

Mat2.prototype.invert = function( ) {
	var det = this.determinant( );

	if( det > Math.EPSILON )
	{
		{
			var tmp = this.m[ 0 ];
			this.m[ 0 ] = this.m[ 3 ];
			this.m[ 3 ] = tmp;

			tmp = this.m[ 1 ];
			this.m[ 1 ] = -this.m[ 2 ];
			this.m[ 2 ] = -tmp;
		}

		this.m[ 0 ] /= det;
		this.m[ 1 ] /= det;
		this.m[ 2 ] /= det;
		this.m[ 3 ] /= det;

		return true;
	}

	return false;
};

Mat2.prototype.transpose = function( ) {
	var tmp = this.m[ 1 ];
	this.m[ 1 ] = this.m[ 2 ];
	this.m[ 2 ] = tmp;
};

Mat2.prototype.x_vector = function() {
	var arr = this.m.slice( 0, 2 );
	return new Vec2( arr[0], arr[1] );
};

Mat2.prototype.y_vector = function() {
	var arr = this.m.slice( 2, 4 );
	return new Vec2( arr[0], arr[1] );
};

Mat2.prototype.toString = function( ) {
	return "|" + this.m[0] + " " + this.m[2] + "|\n" +
	       "|" + this.m[1] + " " + this.m[3] + "|\n";
};

