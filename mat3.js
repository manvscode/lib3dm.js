/*
 * mat3 -- 3D matrix
 */
function mat3( a, b, c, d, e, f, g, h, i ) {
	this.m = [a, b, c,
	          d, e, f,
	          g, h, i];
}

mat3.MAT3_IDENTITY = mat3( 1, 0, 0,
                           0, 1, 0,
                           0, 0, 1 );
mat3.MAT3_ZERO     = mat3( 0, 0, 0,
                           0, 0, 0,
                           0, 0, 0 );

mat3.prototype.identity = function( ) {
	return this.m = MAT3_IDENITY;
};

mat3.prototype.zero = function( ) {
	return this.m = MAT3_ZERO;
};

mat3.prototype.determinant = function( ) {
	return this.m[ 0 ] * this.m[ 4 ] * this.m[ 8 ] +
           this.m[ 3 ] * this.m[ 7 ] * this.m[ 2 ] +
           this.m[ 6 ] * this.m[ 1 ] * this.m[ 5 ] -
           this.m[ 6 ] * this.m[ 4 ] * this.m[ 2 ] -
           this.m[ 3 ] * this.m[ 1 ] * this.m[ 8 ] -
           this.m[ 0 ] * this.m[ 7 ] * this.m[ 5 ];
};

mat3.prototype.multiply_matrix = function( m ) {
	return new mat3( 
		this.m[ 0 ] * m.m[ 0 ] + this.m[ 3 ] * m.m[ 1 ] + this.m[ 6 ] * m.m[ 2 ],
		this.m[ 1 ] * m.m[ 0 ] + this.m[ 4 ] * m.m[ 1 ] + this.m[ 7 ] * m.m[ 2 ],
		this.m[ 2 ] * m.m[ 0 ] + this.m[ 5 ] * m.m[ 1 ] + this.m[ 8 ] * m.m[ 2 ],

		this.m[ 0 ] * m.m[ 3 ] + this.m[ 3 ] * m.m[ 4 ] + this.m[ 6 ] * m.m[ 5 ],
		this.m[ 1 ] * m.m[ 3 ] + this.m[ 4 ] * m.m[ 4 ] + this.m[ 7 ] * m.m[ 5 ],
		this.m[ 2 ] * m.m[ 3 ] + this.m[ 5 ] * m.m[ 4 ] + this.m[ 8 ] * m.m[ 5 ],

		this.m[ 0 ] * m.m[ 6 ] + this.m[ 3 ] * m.m[ 7 ] + this.m[ 6 ] * m.m[ 8 ],
		this.m[ 1 ] * m.m[ 6 ] + this.m[ 4 ] * m.m[ 7 ] + this.m[ 7 ] * m.m[ 8 ],
		this.m[ 2 ] * m.m[ 6 ] + this.m[ 5 ] * m.m[ 7 ] + this.m[ 8 ] * m.m[ 8 ]
	);
};

mat3.prototype.multiply_vector = function( v ) {
	return new mat3( 
		this.m[ 0 ] * v.x  +  this.m[ 3 ] * v.y  +  this.m[ 6 ] * v.z,
		this.m[ 1 ] * v.x  +  this.m[ 4 ] * v.y  +  this.m[ 7 ] * v.z,
		this.m[ 2 ] * v.x  +  this.m[ 5 ] * v.y  +  this.m[ 8 ] * v.z
	);
};

mat3.prototype.multiply = function( o ) {
	if( o instanceof vec3 ) {
		return this.multiply_vector( o );
	}
	else {
		return this.multiply_matrix( o );
	}
};

mat3.prototype.cofactor = function() {
	return new mat3(
		+(this.m[4] * this.m[8] - this.m[5] * this.m[7]),
		-(this.m[3] * this.m[8] - this.m[5] * this.m[6]),
		+(this.m[3] * this.m[7] - this.m[4] * this.m[6]),

		-(this.m[1] * this.m[8] - this.m[2] * this.m[7]),
		+(this.m[0] * this.m[8] - this.m[2] * this.m[6]),
		-(this.m[0] * this.m[7] - this.m[1] * this.m[6]),

		+(this.m[1] * this.m[5] - this.m[2] * this.m[4]),
		-(this.m[0] * this.m[5] - this.m[2] * this.m[3]),
		+(this.m[0] * this.m[4] - this.m[1] * this.m[3])
	);
};

mat3.prototype.transpose = function() {
	var tmp1 = this.m[ 1 ];
	var tmp2 = this.m[ 2 ];
	var tmp3 = this.m[ 5 ];

	this.m[ 1 ] = this.m[ 3 ];
	this.m[ 2 ] = this.m[ 6 ];
	this.m[ 5 ] = this.m[ 7 ];

	this.m[ 3 ] = tmp1;
	this.m[ 6 ] = tmp2;
	this.m[ 7 ] = tmp3;
};

mat3.prototype.adjoint = function() {
	var cofactor_matrix = this.cofactor();
	cofactor_matrix.transpose();
	this.m = cofactor_matrix.m;
};

mat3.prototype.invert = function() {
	var det = this.determinant();

	if( Math.abs(det) > mathematics.SCALAR_EPSILON ) // testing if not zero
	{
		this.adjoint( );

		this.m[ 0 ] /= det;
		this.m[ 1 ] /= det;
		this.m[ 2 ] /= det;
		this.m[ 3 ] /= det;
		this.m[ 4 ] /= det;
		this.m[ 5 ] /= det;
		this.m[ 6 ] /= det;
		this.m[ 7 ] /= det;
		this.m[ 8 ] /= det;

		return true;
	}

	return false;
};

mat3.prototype.x_vector = function() {
	return this.m.slice( 0, 4 );
};

mat3.prototype.y_vector = function() {
	return this.m.slice( 3, 6 );
};

mat3.prototype.z_vector = function() {
	return this.m.slice( 6, 9 );
};

mat3.prototype.toString = function( ) {
	return "|" + this.m[0] + " " + this.m[3] + " " + this.m[6] + "|\n" +
	       "|" + this.m[1] + " " + this.m[4] + " " + this.m[7] + "|\n" +
	       "|" + this.m[2] + " " + this.m[5] + " " + this.m[8] + "|\n";
};
