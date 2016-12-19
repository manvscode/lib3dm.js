/*
 * 4D Affine Matrix
 */
lib3dmath.Mat4 = function( a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p ) {
	if( this instanceof lib3dmath.Mat4) {
		this.m = [a || 0, b || 0, c || 0, d || 0,
		          e || 0, f || 0, g || 0, h || 0,
		          i || 0, j || 0, k || 0, l || 0,
		          m || 0, n || 0, o || 0, p || 0];
	}
	else {
		return new lib3dmath.Mat4( a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p );
	}
};

lib3dmath.Mat4.fromAxisAngle = function( axis, angle ) {
	var sin_a           = scaler_sin(angle);
	var cos_a           = scaler_cos(angle);
	var one_minus_cos_a = 1 - cos_a;

	var ax = axis.clone();
    ax.normalize( );

	return new lib3dmath.Mat4(
		cos_a + (ax.x * ax.x) * one_minus_cos_a,
		ax.y * ax.x * one_minus_cos_a + ax.z * sin_a,
		ax.z * ax.x * one_minus_cos_a - ax.y * sin_a,
		0.0,

		ax.x * ax.y * one_minus_cos_a - ax.z * sin_a,
		cos_a + (ax.y * ax.y) * one_minus_cos_a,
		ax.z * ax.y * one_minus_cos_a + ax.x * sin_a,
		0.0,

		ax.x * ax.z * one_minus_cos_a + ax.y * sin_a,
		ax.y * ax.z * one_minus_cos_a - ax.x * sin_a,
		cos_a + (ax.z * ax.z) * one_minus_cos_a,
		0.0,

		0.0,
		0.0,
		0.0,
		1.0
	);
};

lib3dmath.Mat4.prototype = {
	identity: function( ) {
		return this.m = IDENITY;
	},

	zero: function( ) {
		return this.m = ZERO;
	},

	determinant: function() {
		var d1 = this.m[5] * (this.m[10] * this.m[15] - this.m[14] * this.m[11]) - this.m[6] * (this.m[9] * this.m[15] - this.m[13] * this.m[11]) + this.m[7] * (this.m[9] * this.m[14] - this.m[13] * this.m[10]);
		var d2 = this.m[4] * (this.m[10] * this.m[15] - this.m[14] * this.m[11]) - this.m[6] * (this.m[8] * this.m[15] - this.m[12] * this.m[11]) + this.m[7] * (this.m[8] * this.m[14] - this.m[12] * this.m[10]);
		var d3 = this.m[4] * (this.m[9] * this.m[15] - this.m[13] * this.m[11]) - this.m[5] * (this.m[8] * this.m[15] - this.m[12] * this.m[11]) + this.m[7] * (this.m[8] * this.m[13] - this.m[12] * this.m[9]);
		var d4 = this.m[4] * (this.m[9] * this.m[14] - this.m[13] * this.m[10]) - this.m[5] * (this.m[8] * this.m[14] - this.m[12] * this.m[10]) + this.m[6] * (this.m[8] * this.m[13] - this.m[12] * this.m[9]);
		return this.m[0]*d1 - this.m[1]*d2 + this.m[2]*d3 - this.m[3]*d4;
	},

	multiplyMatrix: function( m ) {
		return new lib3dmath.Mat4(
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
	},

	multiplyVector: function( v ) {
		return new lib3dmath.Vec4(
			this.m[ 0] * v.x  +  this.m[ 4] * v.y  +  this.m[ 8] * v.z  +  this.m[12] * v.w,
			this.m[ 1] * v.x  +  this.m[ 5] * v.y  +  this.m[ 9] * v.z  +  this.m[13] * v.w,
			this.m[ 2] * v.x  +  this.m[ 6] * v.y  +  this.m[10] * v.z  +  this.m[14] * v.w,
			this.m[ 3] * v.x  +  this.m[ 7] * v.y  +  this.m[11] * v.z  +  this.m[15] * v.w
		);
	},

	multiply: function( o ) {
		if( o instanceof lib3dmath.Vec4 ) {
			return this.multiplyVector( o );
		}
		else {
			return this.multiplyMatrix( o );
		}
	},

	cofactor: function() {
		return new lib3dmath.Mat4(
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
	},

	transpose: function() {
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
	},

	adjoint: function() {
		var cofactor_matrix = this.cofactor( );
		cofactor_matrix.transpose( );
		this.m = cofactor_matrix.m;
	},

	invert: function() {
		var d1 = this.m[5] * (this.m[10] * this.m[15] - this.m[14] * this.m[11]) - this.m[6] * (this.m[9] * this.m[15] - this.m[13] * this.m[11]) + this.m[7] * (this.m[9] * this.m[14] - this.m[13] * this.m[10]);
		var d2 = this.m[4] * (this.m[10] * this.m[15] - this.m[14] * this.m[11]) - this.m[6] * (this.m[8] * this.m[15] - this.m[12] * this.m[11]) + this.m[7] * (this.m[8] * this.m[14] - this.m[12] * this.m[10]);
		var d3 = this.m[4] * (this.m[9] * this.m[15] - this.m[13] * this.m[11]) - this.m[5] * (this.m[8] * this.m[15] - this.m[12] * this.m[11]) + this.m[7] * (this.m[8] * this.m[13] - this.m[12] * this.m[9]);
		var d4 = this.m[4] * (this.m[9] * this.m[14] - this.m[13] * this.m[10]) - this.m[5] * (this.m[8] * this.m[14] - this.m[12] * this.m[10]) + this.m[6] * (this.m[8] * this.m[13] - this.m[12] * this.m[9]);
		var det = this.m[0]*d1 - this.m[1]*d2 + this.m[2]*d3 - this.m[3]*d4;

		if( Math.abs(det) > Math.EPSILON ) // testing if not zero
		{
			var cofactor_matrix = new lib3dmath.Mat4(
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
	},

	x_vector: function() {
		var arr = this.m.slice( 0, 4 );
		return new Vec4( arr[0], arr[1], arr[2], arr[3] );
	},

	y_vector: function() {
		var arr = this.m.slice( 4, 8 );
		return new Vec4( arr[0], arr[1], arr[2], arr[3] );
	},

	z_vector: function() {
		var arr = this.m.slice( 8, 12 );
		return new Vec4( arr[0], arr[1], arr[2], arr[3] );
	},

	w_vector: function() {
		var arr = this.m.slice( 12, 16 );
		return new Vec4( arr[0], arr[1], arr[2], arr[3] );
	},

	toString: function( ) {
		return "|" + lib3dmath.format(this.m[0]) + " " + lib3dmath.format(this.m[4]) + " " + lib3dmath.format(this.m[ 8]) + " " + lib3dmath.format(this.m[12]) + "|\n" +
			   "|" + lib3dmath.format(this.m[1]) + " " + lib3dmath.format(this.m[5]) + " " + lib3dmath.format(this.m[ 9]) + " " + lib3dmath.format(this.m[13]) + "|\n" +
			   "|" + lib3dmath.format(this.m[2]) + " " + lib3dmath.format(this.m[6]) + " " + lib3dmath.format(this.m[10]) + " " + lib3dmath.format(this.m[14]) + "|\n" +
			   "|" + lib3dmath.format(this.m[3]) + " " + lib3dmath.format(this.m[7]) + " " + lib3dmath.format(this.m[11]) + " " + lib3dmath.format(this.m[15]) + "|\n";
	},
};

lib3dmath.Mat4.IDENTITY = (function() {
	var i = new lib3dmath.Mat4( 1, 0, 0, 0,
				      0, 1, 0, 0,
				      0, 0, 1, 0,
				      0, 0, 0, 1 );
	Object.freeze( i );
	return i;
}());

lib3dmath.Mat4.ZERO = (function() {
	var z = new lib3dmath.Mat4( 0, 0, 0, 0,
	                  0, 0, 0, 0,
	                  0, 0, 0, 0,
	                  0, 0, 0, 0 );
	Object.freeze( z );
	return z;
}());
