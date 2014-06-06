/*
 * 3D matrix
 */
function Mat3( a, b, c, d, e, f, g, h, i ) {
	if( this instanceof Mat3 ) {
		this.m = [a || 0, b || 0, c || 0,
		          d || 0, e || 0, f || 0,
		          g || 0, h || 0, i || 0];
	}
	else {
		return new Mat3( a, b, c, d, e, f, g, h, i );
	}
}

Mat3.IDENTITY = (function() {
	var i = new Mat3( 1, 0, 0,
	                  0, 1, 0,
	                  0, 0, 1 );
	Object.freeze( i );
	return i;
}());

Mat3.ZERO = (function() {
	var z = new Mat3( 0, 0, 0,
	                  0, 0, 0,
	                  0, 0, 0 );
	Object.freeze( z );
	return z;
}());

Mat3.prototype.identity = function( ) {
	return this.m = Mat3.IDENITY.m;
};

Mat3.prototype.zero = function( ) {
	return this.m = Mat3.ZERO.m;
};

Mat3.prototype.determinant = function( ) {
	return this.m[ 0 ] * this.m[ 4 ] * this.m[ 8 ] +
           this.m[ 3 ] * this.m[ 7 ] * this.m[ 2 ] +
           this.m[ 6 ] * this.m[ 1 ] * this.m[ 5 ] -
           this.m[ 6 ] * this.m[ 4 ] * this.m[ 2 ] -
           this.m[ 3 ] * this.m[ 1 ] * this.m[ 8 ] -
           this.m[ 0 ] * this.m[ 7 ] * this.m[ 5 ];
};

Mat3.prototype.multiplyMatrix = function( m ) {
	return new Mat3( 
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

Mat3.prototype.multiplyVector = function( v ) {
	return new Vec3( 
		this.m[ 0 ] * v.x  +  this.m[ 3 ] * v.y  +  this.m[ 6 ] * v.z,
		this.m[ 1 ] * v.x  +  this.m[ 4 ] * v.y  +  this.m[ 7 ] * v.z,
		this.m[ 2 ] * v.x  +  this.m[ 5 ] * v.y  +  this.m[ 8 ] * v.z
	);
};

Mat3.prototype.multiply = function( o ) {
	if( o instanceof Vec3 ) {
		console.log( "multiplying vector" );
		return this.multiplyVector( o );
	}
	else {
		console.log( "multiplying matrix" );
		return this.multiplyMatrix( o );
	}
};

Mat3.prototype.cofactor = function() {
	return new Mat3(
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

Mat3.prototype.transpose = function() {
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

Mat3.prototype.adjoint = function() {
	var cofactor_matrix = this.cofactor();
	cofactor_matrix.transpose();
	this.m = cofactor_matrix.m;
};

Mat3.prototype.invert = function() {
	var det = this.determinant();

	if( Math.abs(det) > Math.EPSILON ) // testing if not zero
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

Mat3.prototype.x_vector = function() {
	var arr = this.m.slice( 0, 4 );
	return new Vec3( arr[0], arr[1], arr[2] );
};

Mat3.prototype.y_vector = function() {
	var arr = this.m.slice( 3, 6 );
	return new Vec3( arr[0], arr[1], arr[2] );
};

Mat3.prototype.z_vector = function() {
	var arr = this.m.slice( 6, 9 );
	return new Vec3( arr[0], arr[1], arr[2] );
};

Mat3.prototype.toString = function( ) {
	return "|" + this.m[0] + " " + this.m[3] + " " + this.m[6] + "|\n" +
	       "|" + this.m[1] + " " + this.m[4] + " " + this.m[7] + "|\n" +
	       "|" + this.m[2] + " " + this.m[5] + " " + this.m[8] + "|\n";
};
