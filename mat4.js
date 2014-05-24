/*
 * mat4 -- 4D affine matrix
 */
function mat4( a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p ) {
	this.m = [a, b, c, d,
	          e, f, g, h,
	          i, j, k, l,
	          m, n, o, p];
}

mat4.MAT4_IDENTITY = mat4( 1, 0, 0, 0,
                           0, 1, 0, 0,
                           0, 0, 1, 0,
                           0, 0, 0, 1 );
mat4.MAT4_ZERO     = mat4( 0, 0, 0, 0,
                           0, 0, 0, 0,
                           0, 0, 0, 0,
                           0, 0, 0, 0 );

mat4.prototype.identity = function( ) {
	return this.m = MAT4_IDENITY;
};

mat4.prototype.zero = function( ) {
	return this.m = MAT4_ZERO;
};

mat4.prototype.determinant = function() {
	var d1 = this.m[5] * (this.m[10] * this.m[15] - this.m[14] * this.m[11]) - this.m[6] * (this.m[9] * this.m[15] - this.m[13] * this.m[11]) + this.m[7] * (this.m[9] * this.m[14] - this.m[13] * this.m[10]);
	var d2 = this.m[4] * (this.m[10] * this.m[15] - this.m[14] * this.m[11]) - this.m[6] * (this.m[8] * this.m[15] - this.m[12] * this.m[11]) + this.m[7] * (this.m[8] * this.m[14] - this.m[12] * this.m[10]);
	var d3 = this.m[4] * (this.m[9] * this.m[15] - this.m[13] * this.m[11]) - this.m[5] * (this.m[8] * this.m[15] - this.m[12] * this.m[11]) + this.m[7] * (this.m[8] * this.m[13] - this.m[12] * this.m[9]);
	var d4 = this.m[4] * (this.m[9] * this.m[14] - this.m[13] * this.m[10]) - this.m[5] * (this.m[8] * this.m[14] - this.m[12] * this.m[10]) + this.m[6] * (this.m[8] * this.m[13] - this.m[12] * this.m[9]);
	return this.m[0]*d1 - this.m[1]*d2 + this.m[2]*d3 - this.m[3]*d4;
};

mat4.prototype.multiply_matrix = function( m ) {
	return new mat4(
		this.m[ 0] * m.m[ 0]  +  this.m[ 4] * m.m[ 1]  +  this.m[ 8] * m.m[ 2]  +  this.m[12] * m.m[ 3],
		this.m[ 1] * m.m[ 0]  +  this.m[ 5] * m.m[ 1]  +  this.m[ 9] * m.m[ 2]  +  this.m[13] * m.m[ 3],
		this.m[ 2] * m.m[ 0]  +  this.m[ 6] * m.m[ 1]  +  this.m[10] * m.m[ 2]  +  this.m[14] * m.m[ 3],
		this.m[ 3] * m.m[ 0]  +  this.m[ 7] * m.m[ 1]  +  this.m[11] * m.m[ 2]  +  this.m[15] * m.m[ 3],

		this.m[ 0] * m.m[ 4]  +  this.m[ 4] * m.m[ 5]  +  this.m[ 8] * m.m[ 6]  +  this.m[12] * m.m[ 7],
		this.m[ 1] * m.m[ 4]  +  this.m[ 5] * m.m[ 5]  +  this.m[ 9] * m.m[ 6]  +  this.m[13] * m.m[ 7],
		this.m[ 2] * m.m[ 4]  +  this.m[ 6] * m.m[ 5]  +  this.m[10] * m.m[ 6]  +  this.m[14] * m.m[ 7],
		this.m[ 3] * m.m[ 4]  +  this.m[ 7] * m.m[ 5]  +  this.m[11] * m.m[ 6]  +  this.m[15] * m.m[ 7],

		this.m[ 0] * m.m[ 8]  +  this.m[ 4] * m.m[ 9]  +  this.m[ 8] * m.m[10]  +  this.m[12] * m.m[11],
		this.m[ 1] * m.m[ 8]  +  this.m[ 5] * m.m[ 9]  +  this.m[ 9] * m.m[10]  +  this.m[13] * m.m[11],
		this.m[ 2] * m.m[ 8]  +  this.m[ 6] * m.m[ 9]  +  this.m[10] * m.m[10]  +  this.m[14] * m.m[11],
		this.m[ 3] * m.m[ 8]  +  this.m[ 7] * m.m[ 9]  +  this.m[11] * m.m[10]  +  this.m[15] * m.m[11],

		this.m[ 0] * m.m[12]  +  this.m[ 4] * m.m[13]  +  this.m[ 8] * m.m[14]  +  this.m[12] * m.m[15],
		this.m[ 1] * m.m[12]  +  this.m[ 5] * m.m[13]  +  this.m[ 9] * m.m[14]  +  this.m[13] * m.m[15],
		this.m[ 2] * m.m[12]  +  this.m[ 6] * m.m[13]  +  this.m[10] * m.m[14]  +  this.m[14] * m.m[15],
		this.m[ 3] * m.m[12]  +  this.m[ 7] * m.m[13]  +  this.m[11] * m.m[14]  +  this.m[15] * m.m[15]
	);
};

mat4.prototype.multiply_vector = function( v ) {
	return new vec4(
		this.m[ 0] * v.x  +  this.m[ 4] * v.y  +  this.m[ 8] * v.z  +  this.m[12] * v.w,
		this.m[ 1] * v.x  +  this.m[ 5] * v.y  +  this.m[ 9] * v.z  +  this.m[13] * v.w,
		this.m[ 2] * v.x  +  this.m[ 6] * v.y  +  this.m[10] * v.z  +  this.m[14] * v.w,
		this.m[ 3] * v.x  +  this.m[ 7] * v.y  +  this.m[11] * v.z  +  this.m[15] * v.w
	);
};

mat4.prototype.multiply = function( o ) {
	if( o instanceof vec4 ) {
		return this.multiply_vector( o );
	}
	else {
		return this.multiply_matrix( o );
	}
};

mat4.prototype.cofactor = function() {
	return new mat4(
		+(this.m[5] * (this.m[10] * this.m[15] - this.m[14] * this.m[11]) - this.m[6] * (this.m[9] * this.m[15] - this.m[13] * this.m[11]) + this.m[7] * (this.m[9] * this.m[14] - this.m[13] * this.m[10])),
		-(this.m[4] * (this.m[10] * this.m[15] - this.m[14] * this.m[11]) - this.m[6] * (this.m[8] * this.m[15] - this.m[12] * this.m[11]) + this.m[7] * (this.m[8] * this.m[14] - this.m[12] * this.m[10])),
		+(this.m[4] * (this.m[9] * this.m[15] - this.m[13] * this.m[11]) - this.m[5] * (this.m[8] * this.m[15] - this.m[12] * this.m[11]) + this.m[7] * (this.m[8] * this.m[13] - this.m[12] * this.m[9])),
		-(this.m[4] * (this.m[9] * this.m[14] - this.m[13] * this.m[10]) - this.m[5] * (this.m[8] * this.m[14] - this.m[12] * this.m[10]) + this.m[6] * (this.m[8] * this.m[13] - this.m[12] * this.m[9])),
		-(this.m[1] * (this.m[10]*this.m[15]-this.m[14]*this.m[11]) - this.m[2] * (this.m[9]*this.m[15]-this.m[13]*this.m[11]) + this.m[3] * (this.m[9]*this.m[14]-this.m[13]*this.m[10])),
		+(this.m[0] * (this.m[10]*this.m[15]-this.m[14]*this.m[11]) - this.m[2] * (this.m[8]*this.m[15]-this.m[12]*this.m[11]) + this.m[3] * (this.m[8]*this.m[14]-this.m[12]*this.m[10])),
		-(this.m[0] * (this.m[9]*this.m[15]-this.m[13]*this.m[11]) - this.m[1] * (this.m[8]*this.m[15]-this.m[12]*this.m[11]) + this.m[3] * (this.m[8]*this.m[13]-this.m[12]*this.m[9])),
		+(this.m[0] * (this.m[9]*this.m[14]-this.m[13]*this.m[10]) - this.m[1] * (this.m[8]*this.m[14]-this.m[12]*this.m[10]) + this.m[2] * (this.m[8]*this.m[13]-this.m[12]*this.m[9])),
		+(this.m[1] * (this.m[6]*this.m[15]-this.m[14]*this.m[7]) - this.m[2] * (this.m[5]*this.m[15]-this.m[13]*this.m[7]) + this.m[3] * (this.m[5]*this.m[14]-this.m[13]*this.m[6])),
		-(this.m[0] * (this.m[6]*this.m[15]-this.m[14]*this.m[7]) - this.m[2] * (this.m[4]*this.m[15]-this.m[12]*this.m[7]) + this.m[3] * (this.m[4]*this.m[14]-this.m[12]*this.m[6])),
		+(this.m[0] * (this.m[5]*this.m[15]-this.m[13]*this.m[7]) - this.m[1] * (this.m[4]*this.m[15]-this.m[12]*this.m[7]) + this.m[3] * (this.m[4]*this.m[13]-this.m[12]*this.m[5])),
		-(this.m[0] * (this.m[5]*this.m[14]-this.m[13]*this.m[6]) - this.m[1] * (this.m[4]*this.m[14]-this.m[12]*this.m[6]) + this.m[2] * (this.m[4]*this.m[13]-this.m[12]*this.m[5])),
		-(this.m[1] * (this.m[6]*this.m[11]-this.m[10]*this.m[7]) - this.m[2] * (this.m[5]*this.m[11]-this.m[9]*this.m[7]) + this.m[3] * (this.m[5]*this.m[10]-this.m[9]*this.m[6])),
		+(this.m[0] * (this.m[6]*this.m[11]-this.m[10]*this.m[7]) - this.m[2] * (this.m[4]*this.m[11]-this.m[8]*this.m[7]) + this.m[3] * (this.m[4]*this.m[10]-this.m[8]*this.m[6])),
		-(this.m[0] * (this.m[5]*this.m[11]-this.m[9]*this.m[7]) - this.m[1] * (this.m[4]*this.m[11]-this.m[8]*this.m[7]) + this.m[3] * (this.m[4]*this.m[9]-this.m[8]*this.m[5])),
		+(this.m[0] * (this.m[5]*this.m[10]-this.m[9]*this.m[6]) - this.m[1] * (this.m[4]*this.m[10]-this.m[8]*this.m[6]) + this.m[2] * (this.m[4]*this.m[9]-this.m[8]*this.m[5]))
	);
};

mat4.prototype.transpose = function() {
	var tmp1 = this.m[ 1];
	var tmp2 = this.m[ 2];
	var tmp3 = this.m[ 3];
	var tmp4 = this.m[ 6];
	var tmp5 = this.m[ 7];
	var tmp6 = this.m[11];

	this.m[ 1] = this.m[ 4];
	this.m[ 2] = this.m[ 8];
	this.m[ 3] = this.m[12];
	this.m[ 6] = this.m[ 9];
	this.m[ 7] = this.m[13];
	this.m[11] = this.m[14];

	this.m[ 4] = tmp1;
	this.m[ 8] = tmp2;
	this.m[12] = tmp3;
	this.m[ 9] = tmp4;
	this.m[13] = tmp5;
	this.m[14] = tmp6;
};

mat4.prototype.adjoint = function() {
	var cofactor_matrix = this.cofactor( );
	cofactor_matrix.transpose( );
	this.m = cofactor_matrix.m;
};

mat4.prototype.invert = function() {
	var d1 = this.m[5] * (this.m[10] * this.m[15] - this.m[14] * this.m[11]) - this.m[6] * (this.m[9] * this.m[15] - this.m[13] * this.m[11]) + this.m[7] * (this.m[9] * this.m[14] - this.m[13] * this.m[10]);
	var d2 = this.m[4] * (this.m[10] * this.m[15] - this.m[14] * this.m[11]) - this.m[6] * (this.m[8] * this.m[15] - this.m[12] * this.m[11]) + this.m[7] * (this.m[8] * this.m[14] - this.m[12] * this.m[10]);
	var d3 = this.m[4] * (this.m[9] * this.m[15] - this.m[13] * this.m[11]) - this.m[5] * (this.m[8] * this.m[15] - this.m[12] * this.m[11]) + this.m[7] * (this.m[8] * this.m[13] - this.m[12] * this.m[9]);
	var d4 = this.m[4] * (this.m[9] * this.m[14] - this.m[13] * this.m[10]) - this.m[5] * (this.m[8] * this.m[14] - this.m[12] * this.m[10]) + this.m[6] * (this.m[8] * this.m[13] - this.m[12] * this.m[9]);
	var det = this.m[0]*d1 - this.m[1]*d2 + this.m[2]*d3 - this.m[3]*d4;

	if( Math.abs(det) > mathematics.SCALAR_EPSILON ) // testing if not zero
	{
		var cofactor_matrix = new mat4(
			+(d1),
			-(d2),
			+(d3),
			-(d4),
			-(this.m[1] * (this.m[10]*this.m[15]-this.m[14]*this.m[11]) - this.m[2] * (this.m[9]*this.m[15]-this.m[13]*this.m[11]) + this.m[3] * (this.m[9]*this.m[14]-this.m[13]*this.m[10])),
			+(this.m[0] * (this.m[10]*this.m[15]-this.m[14]*this.m[11]) - this.m[2] * (this.m[8]*this.m[15]-this.m[12]*this.m[11]) + this.m[3] * (this.m[8]*this.m[14]-this.m[12]*this.m[10])),
			-(this.m[0] * (this.m[9]*this.m[15]-this.m[13]*this.m[11]) - this.m[1] * (this.m[8]*this.m[15]-this.m[12]*this.m[11]) + this.m[3] * (this.m[8]*this.m[13]-this.m[12]*this.m[9])),
			+(this.m[0] * (this.m[9]*this.m[14]-this.m[13]*this.m[10]) - this.m[1] * (this.m[8]*this.m[14]-this.m[12]*this.m[10]) + this.m[2] * (this.m[8]*this.m[13]-this.m[12]*this.m[9])),
			+(this.m[1] * (this.m[6]*this.m[15]-this.m[14]*this.m[7]) - this.m[2] * (this.m[5]*this.m[15]-this.m[13]*this.m[7]) + this.m[3] * (this.m[5]*this.m[14]-this.m[13]*this.m[6])),
			-(this.m[0] * (this.m[6]*this.m[15]-this.m[14]*this.m[7]) - this.m[2] * (this.m[4]*this.m[15]-this.m[12]*this.m[7]) + this.m[3] * (this.m[4]*this.m[14]-this.m[12]*this.m[6])),
			+(this.m[0] * (this.m[5]*this.m[15]-this.m[13]*this.m[7]) - this.m[1] * (this.m[4]*this.m[15]-this.m[12]*this.m[7]) + this.m[3] * (this.m[4]*this.m[13]-this.m[12]*this.m[5])),
			-(this.m[0] * (this.m[5]*this.m[14]-this.m[13]*this.m[6]) - this.m[1] * (this.m[4]*this.m[14]-this.m[12]*this.m[6]) + this.m[2] * (this.m[4]*this.m[13]-this.m[12]*this.m[5])),
			-(this.m[1] * (this.m[6]*this.m[11]-this.m[10]*this.m[7]) - this.m[2] * (this.m[5]*this.m[11]-this.m[9]*this.m[7]) + this.m[3] * (this.m[5]*this.m[10]-this.m[9]*this.m[6])),
			+(this.m[0] * (this.m[6]*this.m[11]-this.m[10]*this.m[7]) - this.m[2] * (this.m[4]*this.m[11]-this.m[8]*this.m[7]) + this.m[3] * (this.m[4]*this.m[10]-this.m[8]*this.m[6])),
			-(this.m[0] * (this.m[5]*this.m[11]-this.m[9]*this.m[7]) - this.m[1] * (this.m[4]*this.m[11]-this.m[8]*this.m[7]) + this.m[3] * (this.m[4]*this.m[9]-this.m[8]*this.m[5])),
			+(this.m[0] * (this.m[5]*this.m[10]-this.m[9]*this.m[6]) - this.m[1] * (this.m[4]*this.m[10]-this.m[8]*this.m[6]) + this.m[2] * (this.m[4]*this.m[9]-this.m[8]*this.m[5]))
		);

		cofactor_matrix.transpose( );
		this.m = cofactor_matrix.m;

		this.m[ 0] /= det;
		this.m[ 1] /= det;
		this.m[ 2] /= det;
		this.m[ 3] /= det;
		this.m[ 4] /= det;
		this.m[ 5] /= det;
		this.m[ 6] /= det;
		this.m[ 7] /= det;
		this.m[ 8] /= det;
		this.m[ 9] /= det;
		this.m[10] /= det;
		this.m[11] /= det;
		this.m[12] /= det;
		this.m[13] /= det;
		this.m[14] /= det;
		this.m[15] /= det;

		return true;
	}

	return false;
};

mat4.prototype.x_vector = function() {
	return this.m.slice( 0, 4 );
};

mat4.prototype.y_vector = function() {
	return this.m.slice( 4, 8 );
};

mat4.prototype.z_vector = function() {
	return this.m.slice( 8, 12 );
};

mat4.prototype.w_vector = function() {
	return this.m.slice( 12, 16 );
};

mat4.prototype.toString = function( ) {
	return "|" + this.m[0] + " " + this.m[4] + " " + this.m[ 8] + " " + this.m[12] + "|\n" +
	       "|" + this.m[1] + " " + this.m[5] + " " + this.m[ 9] + " " + this.m[13] + "|\n" +
	       "|" + this.m[2] + " " + this.m[6] + " " + this.m[10] + " " + this.m[14] + "|\n" +
	       "|" + this.m[3] + " " + this.m[7] + " " + this.m[11] + " " + this.m[15] + "|\n";
};
