/*
 * mat2 -- 2D matrix
 */
function mat2( a, b, c, d ) {
	this.m = [a, b,
	          c, d];
}

mat2.MAT2_IDENTITY = mat2( 1, 0,
                           0, 1 );
mat2.MAT2_ZERO     = mat2( 0, 0,
                           0, 0 );

mat2.prototype.identity = function( ) {
	return this.m = MAT2_IDENITY;
};

mat2.prototype.zero = function( ) {
	return this.m = MAT2_ZERO;
};

mat2.prototype.determinant = function( ) {
	return this.m[ 0 ] * this.m[ 3 ] - this.m[ 1 ] * this.m[ 2 ];
};

mat2.prototype.multiply_matrix = function( m ) {
	return new mat2( 
		this.m[ 0 ] * m.m[ 0 ] + this.m[ 2 ] * m.m[ 1 ],
		this.m[ 1 ] * m.m[ 0 ] + this.m[ 3 ] * m.m[ 1 ],
		this.m[ 0 ] * m.m[ 2 ] + this.m[ 2 ] * m.m[ 3 ],
		this.m[ 1 ] * m.m[ 2 ] + this.m[ 3 ] * m.m[ 3 ]
	);
};

mat2.prototype.multiply_vector = function( v ) {
	return new vec2( 
		this.m[ 0 ] * v.x + this.m[ 2 ] * v.y,
		this.m[ 1 ] * v.x + this.m[ 3 ] * v.y
	);
};

mat2.prototype.multiply = function( o ) {
	if( o instanceof vec2 ) {
		return this.multiply_vector( o );
	}
	else {
		return this.multiply_matrix( o );
	}
};

mat2.prototype.invert = function( ) {
	var det = this.determinant( );

	if( det > mathematics.SCALAR_EPSILON )
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

mat2.prototype.transpose = function( ) {
	var tmp = this.m[ 1 ];
	this.m[ 1 ] = this.m[ 2 ];
	this.m[ 2 ] = tmp;
};

mat2.prototype.x_vector = function() {
	return this.m.slice( 0, 2 );
};

mat2.prototype.y_vector = function() {
	return this.m.slice( 2, 4 );
};

mat2.prototype.toString = function( ) {
	return "|" + this.m[0] + " " + this.m[2] + "|\n" +
	       "|" + this.m[1] + " " + this.m[3] + "|\n";
};

