/*
 * 3D matrix
 */
lib3dmath.Mat3 = function( a, b, c, d, e, f, g, h, i ) {
	if( this instanceof lib3dmath.Mat3 ) {
		this.m = [a || 0, b || 0, c || 0,
		          d || 0, e || 0, f || 0,
		          g || 0, h || 0, i || 0];
	}
	else {
		return new lib3dmath.Mat3( a, b, c, d, e, f, g, h, i );
	}
};

lib3dmath.Mat3.fromMatrix = function( m ) {
	if( m instanceof lib3dmath.Mat4 ) {
		return new lib3dmath.Mat4(
			m.m[ 0], m.m[ 1], m.m[ 2], 0,
			m.m[ 4], m.m[ 5], m.m[ 6], 0,
			m.m[ 8], m.m[ 9], m.m[10], 0,
			      0,       0,       0, 1
		);
	}
	else if( m instanceof lib3dmath.Mat3 ) {
		return new lib3dmath.Mat3(
			m.m[0], m.m[1], m.m[2],
			m.m[3], m.m[4], m.m[5],
			m.m[6], m.m[7], m.m[8]
		);
	}
};

lib3dmath.Mat3.fromAxisAngle = function( axis, angle ) {
	var sin_a           = Math.sin(angle);
	var cos_a           = Math.cos(angle);
	var one_minus_cos_a = 1 - cos_a;

    var ax = axis.clone();
    ax.normalize( );

	return new lib3dmath.Mat3(
		cos_a + (ax.x * ax.x) * one_minus_cos_a,
		ax.y * ax.x * one_minus_cos_a + ax.z * sin_a,
		ax.z * ax.x * one_minus_cos_a - ax.y * sin_a,

		ax.x * ax.y * one_minus_cos_a - ax.z * sin_a,
		cos_a + (ax.y * ax.y) * one_minus_cos_a,
		ax.z * ax.y * one_minus_cos_a + ax.x * sin_a,

		ax.x * ax.z * one_minus_cos_a + ax.y * sin_a,
		ax.y * ax.z * one_minus_cos_a - ax.x * sin_a,
		cos_a + (ax.z * ax.z) * one_minus_cos_a
	);
};

lib3dmath.Mat3.prototype = {
	identity: function( ) {
		return this.m = lib3dmath.Mat3.IDENITY.m;
	},

	zero: function( ) {
		return this.m = lib3dmath.Mat3.ZERO.m;
	},

	determinant: function( ) {
		return this.m[ 0 ] * this.m[ 4 ] * this.m[ 8 ] +
			   this.m[ 3 ] * this.m[ 7 ] * this.m[ 2 ] +
			   this.m[ 6 ] * this.m[ 1 ] * this.m[ 5 ] -
			   this.m[ 6 ] * this.m[ 4 ] * this.m[ 2 ] -
			   this.m[ 3 ] * this.m[ 1 ] * this.m[ 8 ] -
			   this.m[ 0 ] * this.m[ 7 ] * this.m[ 5 ];
	},

	multiplyMatrix: function( m ) {
		return new lib3dmath.Mat3(
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
	},

	multiplyVector: function( v ) {
		return new lib3dmath.Vec3(
			this.m[ 0 ] * v.x  +  this.m[ 3 ] * v.y  +  this.m[ 6 ] * v.z,
			this.m[ 1 ] * v.x  +  this.m[ 4 ] * v.y  +  this.m[ 7 ] * v.z,
			this.m[ 2 ] * v.x  +  this.m[ 5 ] * v.y  +  this.m[ 8 ] * v.z
		);
	},

	multiply: function( o ) {
		if( o instanceof lib3dmath.Vec3) {
			return this.multiplyVector( o );
		}
		else {
			return this.multiplyMatrix( o );
		}
	},

	cofactor: function() {
		return new lib3dmath.Mat3(
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
	},

	transpose: function() {
		var tmp1 = this.m[ 1 ];
		var tmp2 = this.m[ 2 ];
		var tmp3 = this.m[ 5 ];

		this.m[ 1 ] = this.m[ 3 ];
		this.m[ 2 ] = this.m[ 6 ];
		this.m[ 5 ] = this.m[ 7 ];

		this.m[ 3 ] = tmp1;
		this.m[ 6 ] = tmp2;
		this.m[ 7 ] = tmp3;
	},

	adjoint: function() {
		var cofactor_matrix = this.cofactor();
		cofactor_matrix.transpose();
		this.m = cofactor_matrix.m;
	},

	invert: function() {
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
	},

	x_vector: function() {
		var arr = this.m.slice( 0, 4 );
		return new lib3dmath.Vec3( arr[0], arr[1], arr[2] );
	},

	y_vector: function() {
		var arr = this.m.slice( 3, 6 );
		return new lib3dmath.Vec3( arr[0], arr[1], arr[2] );
	},

	z_vector: function() {
		var arr = this.m.slice( 6, 9 );
		return new lib3dmath.Vec3( arr[0], arr[1], arr[2] );
	},

	toString: function( ) {
		return "|" + lib3dmath.format(this.m[0]) + " " + lib3dmath.format(this.m[3]) + " " + lib3dmath.format(this.m[6]) + "|\n" +
			   "|" + lib3dmath.format(this.m[1]) + " " + lib3dmath.format(this.m[4]) + " " + lib3dmath.format(this.m[7]) + "|\n" +
			   "|" + lib3dmath.format(this.m[2]) + " " + lib3dmath.format(this.m[5]) + " " + lib3dmath.format(this.m[8]) + "|\n";
	},
};

lib3dmath.Mat3.IDENTITY = (function() {
	var i = new lib3dmath.Mat3( 1, 0, 0,
	                  0, 1, 0,
	                  0, 0, 1 );
	Object.freeze( i );
	return i;
}());

lib3dmath.Mat3.ZERO = (function() {
	var z = new lib3dmath.Mat3( 0, 0, 0,
	                  0, 0, 0,
	                  0, 0, 0 );
	Object.freeze( z );
	return z;
}());
