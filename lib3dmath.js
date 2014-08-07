/* Copyright (C) 2013-2014 by Joseph A. Marrero, http://www.manvscode.com/
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * This software is a port of Joe Marrero's lib3dmath library. Joe ported this 
 * over for WebGL applications that need a decoupled math library for 3D graphics.
 *
 * The original C code is maintained at http://bitbucket.org/manvscode/lib3dmath
 *
 * The Javascript port is maintained at http://bitbucket.org/manvscode/lib3dmath.js
 */
"use strict";
var lib3dmath = (function() {
	var M = {
		toRadians: function(degrees) { return degrees * this.RADIANS_PER_DEGREE; },
		toDegrees: function(radians) { return radians * this.DEGREES_PER_RANDIAN; },
		integerMax: function(x, y) { return (x) ^ (((x) ^ (y)) & -((x) < (y))); },
		integerMin: function(x, y) { return (y) ^ (((x) ^ (y)) & -((x) < (y))); },
		lerp: function(a, x0, x1) { return (x0) + (a) * ((x1) - (x0)); },
		bilerp: function(a, b, x0, x1, x2, x3) { return this.lerp( b, this.lerp( a, x0, x1 ), this.lerp( a, x2, x3 ) ); },
		uniform: function() { return Math.random(); },
		uniformRange: function(min, max) { var diff = max - min; return min + this.uniform() * diff; },
		uniformUnit: function() { return 2 * this.uniform() - 1; },
		clamp: function(x, min, max) { return Math.min( Math.max(x, min), max ); },
	};


	Object.defineProperties( M, {
		VERSION: {
			value: "1.0",
			writable: false,
			enumerable: true,
			configurable: false,
		},
		SCALAR_EPSILON: {
			value: Math.EPSILON,
			writable: false,
			enumerable: true,
			configurable: true,
		},
		HALF_PI: {
			value: Math.PI / 2.0,
			writable: false,
			enumerable: true,
			configurable: true,
		},
		PI: {
			value: Math.PI,
			writable: false,
			enumerable: true,
			configurable: true,
		},
		TWO_PI: {
			value: 2 * Math.PI,
			writable: false,
			enumerable: true,
			configurable: true,
		},
		RADIANS_PER_DEGREE: {
			value: (Math.PI / 180.0),
			writable: false,
			enumerable: true,
			configurable: true,
		},
		DEGREES_PER_RANDIAN: {
			value: (180.0 / Math.PI),
			writable: false,
			enumerable: true,
			configurable: true,
		},
	});

	return M;
}());

/*
 * 2D vector
 */
lib3dmath.Vec2 = function( x, y ) {
	if( this instanceof lib3dmath.Vec2 ) {
		this.x = x || 0;
		this.y = y || 0;
	}
	else {
		return new lib3dmath.Vec2( x, y );
	}
};

lib3dmath.Vec2.prototype = {
	add: function( v ) {
		return new lib3dmath.Vec2( this.x + v.x, this.y + v.y );
	},

	subtract: function( v ) {
		return new lib3dmath.Vec2( this.x - v.x, this.y - v.y );
	},

	multiply: function( s ) {
		return new lib3dmath.Vec2( this.x * s, this.y * s );
	},

	scale: function( s ) {
		return this.multiply( s );
	},

	dotProduct: function( v ) {
		return this.x * v.x + this.y * v.y;
	},

	crossProduct: function( v ) {
		return new lib3dmath.Vec2( this.y, -this.x );
	},

	determinant: function( v ) {
		return this.x * v.y - v.x * this.y;
	},

	magnitude: function( ) {
		return Math.sqrt( this.x * this.x + this.y * this.y );
	},

	distance: function( v ) {
		return Math.sqrt(
			(this.x - v.x) * (this.x - v.x) +
			(this.y - v.y) * (this.y - v.y)
		);
	},

	angle: function( v ) {
		var dot_product = this.dot_product( v );
		var a_length    = this.magnitude( );
		var b_length    = v.magnitude( );
		return Math.acos( dot_product / ( a_length * b_length ) );
	},

	normalize: function( ) {
		var length = this.magnitude();
		if( length > 0.0 ) {
			this.x /= length;
			this.y /= length;
		}
	},

	isNormalized: function( ) {
		return Math.abs(length - 1.0) < Math.EPSILON;
	},

	negate: function( ) {
		this.x = -this.x;
		this.y = -this.y;
	},

	zero: function( ) {
		this.x = 0.0;
		this.y = 0.0;
	},

	lerp: function( a, b, s ) {
		return new lib3dmath.Vec2(
			lib3dmath.lerp( s, a.x, b.x ),
			lib3dmath.lerp( s, a.y, b.y )
		);
	},

	maxComponent: function( v ) {
		return Math.max( v.x, v.y );
	},

	minComponent: function( v ) {
		return Math.min( v.x, v.y );
	},

	toString: function( ) {
		return "(" + this.x + ", " + this.y + ")";
	},
};

lib3dmath.Vec2.ZERO = (function() {
	var z = new lib3dmath.Vec2( 0, 0 );
	Object.freeze( z );
	return z;
}());

lib3dmath.Vec2.ONE = (function() {
	var z = new lib3dmath.Vec2( 1, 1 );
	Object.freeze( z );
	return z;
}());

lib3dmath.Vec2.XUNIT = (function() {
	var x = new lib3dmath.Vec2( 1, 0 );
	Object.freeze( x );
	return x;
}());

lib3dmath.Vec2.YUNIT = (function() {
	var y = new lib3dmath.Vec2( 0, 1 );
	Object.freeze( y );
	return y;
}());

/*
 * 3D vector
 */
lib3dmath.Vec3 = function( x, y, z ) {
	if( this instanceof lib3dmath.Vec3) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
	}
	else {
		return new lib3dmath.Vec3( x, y, z );
	}
};

lib3dmath.Vec3.prototype = {
	add: function( v ) {
		return new lib3dmath.Vec3( this.x + v.x, this.y + v.y, this.z + v.z );
	},

	subtract: function( v ) {
		return new lib3dmath.Vec3( this.x - v.x, this.y - v.y, this.z - v.z );
	},

	multiply: function( s ) {
		return new lib3dmath.Vec3( this.x * s, this.y * s, this.z * s );
	},

	scale: function( s ) {
		return this.multiply( s );
	},

	dotProduct: function( v ) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	},

	crossProduct: function( v ) {
		return new lib3dmath.Vec3(
			this.y * v.z - this.z * v.y,
			this.z * v.x - this.x * v.z,
			this.x * v.y - this.y * v.x
		);
	},

	magnitude: function( ) {
		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * v.z );
	},

	distance: function( v ) {
		return Math.sqrt(
			(this.x - v.x) * (this.x - v.x) +
			(this.y - v.y) * (this.y - v.y) +
			(this.z - v.z) * (this.z - v.z)
		);
	},

	angle: function( v ) {
		var dot_product = this.dotProduct( v );
		var a_length    = this.magnitude( );
		var b_length    = v.magnitude( );

		return Math.acos( dot_product / ( a_length * b_length ) );
	},

	normalize: function( ) {
		var length = this.magnitude();
		if( length > 0.0 ) {
			this.x /= length;
			this.y /= length;
			this.z /= length;
		}
	},

	isNormalized: function( ) {
		var length = this.magnitude();
		return (Math.abs(length - 1.0) < Math.EPSILON);
	},

	negate: function( ) {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
	},

	zero: function( ) {
		this.x = 0.0;
		this.y = 0.0;
		this.z = 0.0;
	},

	lerp: function( a, b, s ) {
		return new lib3dmath.Vec3(
			lib3dmath.lerp( s, a.x, b.x ),
			lib3dmath.lerp( s, a.y, b.y ),
			lib3dmath.lerp( s, a.z, b.z )
		);
	},

	maxComponent: function( v ) {
		return Math.max( Math.max(v.x, v.y), v.z );
	},

	minComponent: function( v ) {
		return Math.min( Math.min(v.x, v.y), v.z );
	},

	toString: function( ) {
		return "(" + this.x + ", " + this.y + ", " + this.z + ")";
	},
};

lib3dmath.Vec3.ZERO = (function() {
	var z = new lib3dmath.Vec3( 0, 0, 0 );
	Object.freeze( z );
	return z;
}());

lib3dmath.Vec3.ONE = (function() {
	var z = new lib3dmath.Vec3( 1, 1, 1 );
	Object.freeze( z );
	return z;
}());

lib3dmath.Vec3.XUNIT = (function() {
	var x = new lib3dmath.Vec3( 1, 0, 0 );
	Object.freeze( x );
	return x;
}());

lib3dmath.Vec3.YUNIT = (function() {
	var y = new lib3dmath.Vec3( 0, 1, 0 );
	Object.freeze( y );
	return y;
}());

lib3dmath.Vec3.ZUNIT = (function() {
	var z = new lib3dmath.Vec3( 0, 0, 1 );
	Object.freeze( z );
	return z;
}());

/*
 * 4D vector
 */
lib3dmath.Vec4 = function( x, y, z, w ) {
	if( this instanceof lib3dmath.Vec4) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		this.w = w || 0;
	}
	else {
		return new lib3dmath.Vec4( x, y, z, w );
	}
};

lib3dmath.Vec4.prototype = {
	add: function( v ) {
		return new lib3dmath.Vec4( 
			this.x + v.x, 
			this.y + v.y, 
			this.z + v.z,
			this.w + v.w
		);
	},

	subtract: function( v ) {
		return new lib3dmath.Vec4(
			this.x - v.x, 
			this.y - v.y, 
			this.z - v.z,
			this.w - v.w
		);
	},

	multiply: function( s ) {
		return new lib3dmath.Vec4(
			this.x * s,
			this.y * s,
			this.z * s,
			this.w * s
		);
	},

	scale: function( s ) {
		return this.multiply( s );
	},

	dotProduct: function( v ) {
		return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
	},

	magnitude: function( ) {
		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * v.z + this.w * v.w );
	},

	distance: function( v ) {
		return Math.sqrt(
			(this.x - v.x) * (this.x - v.x) +
			(this.y - v.y) * (this.y - v.y) +
			(this.z - v.z) * (this.z - v.z) +
			(this.w - v.w) * (this.w - v.w)
		);
	},

	angle: function( v ) {
		var dot_product = this.dotProduct( v );
		var a_length    = this.magnitude( );
		var b_length    = v.magnitude( );

		return Math.acos( dot_product / ( a_length * b_length ) );
	},

	normalize: function( ) {
		var inverse_length = 1.0 / this.magnitude();
		this.x *= inverse_length;
		this.y *= inverse_length;
		this.z *= inverse_length;
		this.w *= inverse_length;
	},

	isNormalized: function( ) {
		return (Math.abs(this.x - 1.0) < Math.EPSILON) &&
			   (Math.abs(this.y - 1.0) < Math.EPSILON) &&
			   (Math.abs(this.z - 1.0) < Math.EPSILON) &&
			   (Math.abs(this.w - 1.0) < Math.EPSILON);
	},

	negate: function( ) {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
		this.w = -this.w;
	},

	zero: function( ) {
		this.x = 0.0;
		this.y = 0.0;
		this.z = 0.0;
		this.w = 0.0;
	},

	lerp: function( a, b, s ) {
		return new lib3dmath.Vec4(
			lib3dmath.lerp( s, a.x, b.x ),
			lib3dmath.lerp( s, a.y, b.y ),
			lib3dmath.lerp( s, a.z, b.z ),
			lib3dmath.lerp( s, a.w, b.w )
		);
	},

	maxComponent: function( v ) {
		return Math.max( Math.max( Math.max(v.x, v.y), v.z ), v.w );
	},

	minComponent: function( v ) {
		return Math.min( Math.min( Math.min(v.x, v.y), v.z ), v.w );
	},

	toString: function( ) {
		return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
	},
};

lib3dmath.Vec4.ZERO = (function() {
	var z = new lib3dmath.Vec4( 0, 0, 0, 0 );
	Object.freeze( z );
	return z;
}());

lib3dmath.Vec4.ONE = (function() {
	var z = new lib3dmath.Vec4( 1, 1, 1, 1 );
	Object.freeze( z );
	return z;
}());

lib3dmath.Vec4.XUNIT = (function() {
	var x = new lib3dmath.Vec4( 1, 0, 0, 0 );
	Object.freeze( x );
	return x;
}());

lib3dmath.Vec4.YUNIT = (function() {
	var y = new lib3dmath.Vec4( 0, 1, 0, 0 );
	Object.freeze( y );
	return y;
}());

lib3dmath.Vec4.ZUNIT = (function() {
	var z = new lib3dmath.Vec4( 0, 0, 1, 0 );
	Object.freeze( z );
	return z;
}());

lib3dmath.Vec4.WUNIT = (function() {
	var w = new lib3dmath.Vec4( 0, 0, 0, 1 );
	Object.freeze( w );
	return w;
}());
/*
 * 2D matrix
 */
lib3dmath.Mat2 = function( a, b, c, d ) {
	if( this instanceof lib3dmath.Mat2) {
		this.m = [a || 0, b || 0,
		          c || 0, d || 0];
	}
	else {
		return new lib3dmath.Mat2( a, b, c, d );
	}
};

lib3dmath.Mat2.prototype = {
	identity: function( ) {
		return this.m = lib3dmath.Mat2.IDENITY;
	},

	zero: function( ) {
		return this.m = lib3dmath.Mat2.ZERO;
	},

	determinant: function( ) {
		return this.m[ 0 ] * this.m[ 3 ] - this.m[ 1 ] * this.m[ 2 ];
	},

	multiplyMatrix: function( m ) {
		return new lib3dmath.Mat2( 
			this.m[ 0 ] * m.m[ 0 ] + this.m[ 2 ] * m.m[ 1 ],
			this.m[ 1 ] * m.m[ 0 ] + this.m[ 3 ] * m.m[ 1 ],
			this.m[ 0 ] * m.m[ 2 ] + this.m[ 2 ] * m.m[ 3 ],
			this.m[ 1 ] * m.m[ 2 ] + this.m[ 3 ] * m.m[ 3 ]
		);
	},

	multiplyVector: function( v ) {
		return new lib3dmath.Vec2( 
			this.m[ 0 ] * v.x + this.m[ 2 ] * v.y,
			this.m[ 1 ] * v.x + this.m[ 3 ] * v.y
		);
	},

	multiply: function( o ) {
		if( o instanceof lib3dmath.Vec2 ) {
			return this.multiplyVector( o );
		}
		else {
			return this.multiplyMatrix( o );
		}
	},

	invert: function( ) {
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
	},

	transpose: function( ) {
		var tmp = this.m[ 1 ];
		this.m[ 1 ] = this.m[ 2 ];
		this.m[ 2 ] = tmp;
	},

	x_vector: function() {
		var arr = this.m.slice( 0, 2 );
		return new lib3dmath.Vec2( arr[0], arr[1] );
	},

	y_vector: function() {
		var arr = this.m.slice( 2, 4 );
		return new lib3dmath.Vec2( arr[0], arr[1] );
	},

	toString: function( ) {
		return "|" + this.m[0] + " " + this.m[2] + "|\n" +
			   "|" + this.m[1] + " " + this.m[3] + "|\n";
	},
};

lib3dmath.Mat2.IDENTITY = (function() {
	var i = new lib3dmath.Mat2( 1, 0,
	                  0, 1 );
	Object.freeze( i );
	return i;
}());

lib3dmath.Mat2.ZERO = (function() {
	var z = new lib3dmath.Mat2( 0, 0,
	                  0, 0 );
	Object.freeze( z );
	return z;
}());
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
		return "|" + this.m[0] + " " + this.m[3] + " " + this.m[6] + "|\n" +
			   "|" + this.m[1] + " " + this.m[4] + " " + this.m[7] + "|\n" +
			   "|" + this.m[2] + " " + this.m[5] + " " + this.m[8] + "|\n";
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
		return new Vec4(
			this.m[ 0] * v.x  +  this.m[ 4] * v.y  +  this.m[ 8] * v.z  +  this.m[12] * v.w,
			this.m[ 1] * v.x  +  this.m[ 5] * v.y  +  this.m[ 9] * v.z  +  this.m[13] * v.w,
			this.m[ 2] * v.x  +  this.m[ 6] * v.y  +  this.m[10] * v.z  +  this.m[14] * v.w,
			this.m[ 3] * v.x  +  this.m[ 7] * v.y  +  this.m[11] * v.z  +  this.m[15] * v.w
		);
	},

	multiply: function( o ) {
		if( o instanceof Vec4 ) {
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
		return "|" + this.m[0] + " " + this.m[4] + " " + this.m[ 8] + " " + this.m[12] + "|\n" +
			   "|" + this.m[1] + " " + this.m[5] + " " + this.m[ 9] + " " + this.m[13] + "|\n" +
			   "|" + this.m[2] + " " + this.m[6] + " " + this.m[10] + " " + this.m[14] + "|\n" +
			   "|" + this.m[3] + " " + this.m[7] + " " + this.m[11] + " " + this.m[15] + "|\n";
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
/*
 * Quaternion
 */
lib3dmath.Quat = function( x, y, z, w ) {
	if( this instanceof lib3dmath.Quat) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		this.w = w || 0;
	}
	else {
		return new lib3dmath.Quat( x, y, z, w );
	}
};

lib3dmath.Quat.fromAxisAngle = function( axis, angle ) {
	var q = new lib3dmath.Quat(
		Math.cos( angle / 2.0 ),
		axis.x * Math.sin( angle / 2.0 ),
		axis.y * Math.sin( angle / 2.0 ),
		axis.z * Math.sin( angle / 2.0 )
	);
	q.normalize( );
	return q;
};

lib3dmath.Quat.fromVector = function( v ) {
	return new lib3dmath.Quat(
		v.x,
		v.y,
		v.z,
		0.0
	);
};

lib3dmath.Quat.fromMatrix = function( m ) {
	if( m instanceof lib3dmath.Mat3) {
		return lib3dmath.Quat.fromMat3( m );
	}
	else {
		return lib3dmath.Quat.fromMat4( m );
	}
};

lib3dmath.Quat.fromMat3 = function( m ) {
	var trace = m.m[0] + m.m[4] + m.m[8]; /* add the diagonal values */

	if( trace > 0.0 )
	{
		var s = 0.5 / Math.sqrt( trace );

		return new lib3dmath.Quat(
			0.25 / s,
			(m.m[7] - m.m[5]) * s,
			(m.m[2] - m.m[6]) * s,
			(m.m[3] - m.m[1]) * s
		);
	}
	else
	{
		var max_diagonal_elem = maxf( m.m[0], maxf( m.m[4], m.m[8] ) );

		if( Math.abs(m.m[0] - max_diagonal_elem) < Math.EPSILON )
		{
			var s = Math.sqrt( 1.0 + m.m[0] - m.m[4] - m.m[8] ) * 2.0;

			return new lib3dmath.Quat(
				0.5 / s,
				(m.m[1] + m.m[3]) / s,
				(m.m[2] + m.m[6]) / s,
				(m.m[5] + m.m[7]) / s
			);
		}
		else if( Math.abs(m.m[4] - max_diagonal_elem) < Math.EPSILON )
		{
			var s = Math.sqrt( 1.0 + m.m[4] - m.m[0] - m.m[8] ) * 2.0;

			return new lib3dmath.Quat(
				(m.m[1] + m.m[3]) / s,
				0.5 / s,
				(m.m[5] + m.m[7]) / s,
				(m.m[2] + m.m[6]) / s
			);
		}
		else
		{
			var s = Math.sqrt( 1.0 + m.m[8] - m.m[0] - m.m[4] ) * 2.0;

			return new lib3dmath.Quat(
				(m.m[2] + m.m[6]) / s,
				(m.m[5] + m.m[7]) / s,
				0.5 / s,
				(m.m[1] + m.m[3]) / s
			);
		}
	}
};

lib3dmath.Quat.fromMat4 = function( m ) {
	var trace = m.m[0] + m.m[5] + m.m[10] + 1; /* add the diagonal values */

	if( trace > 0.0 )
	{
		var s = 0.5 / Math.sqrt( trace );

		return new lib3dmath.Quat(
			0.25 / s,
			(m.m[9] - m.m[6]) * s,
			(m.m[2] - m.m[8]) * s,
			(m.m[4] - m.m[1]) * s
		);
	}
	else
	{
		var max_diagonal_elem = maxf( m.m[0], maxf( m.m[5], m.m[10] ) );

		if( Math.abs(m.m[0] - max_diagonal_elem) < Math.EPSILON )
		{
			var s = Math.sqrt( 1.0 + m.m[0] - m.m[5] - m.m[10] ) * 2.0;

			return new lib3dmath.Quat(
				0.5 / s,
				(m.m[1] + m.m[4]) / s,
				(m.m[2] + m.m[8]) / s,
				(m.m[6] + m.m[9]) / s
			);
		}
		else if( Math.abs(m.m[5] - max_diagonal_elem) < Math.EPSILON )
		{
			var s = Math.sqrt( 1.0 + m.m[5] - m.m[0] - m.m[10] ) * 2.0;

			return new lib3dmath.Quat(
				(m.m[1] + m.m[4]) / s,
				0.5 / s,
				(m.m[6] + m.m[9]) / s,
				(m.m[2] + m.m[8]) / s
			);
		}
		else
		{
			var s = Math.sqrt( 1.0 + m.m[10] - m.m[0] - m.m[5] ) * 2.0;

			return new lib3dmath.Quat(
				(m.m[2] + m.m[8]) / s,
				(m.m[6] + m.m[9]) / s,
				0.5 / s,
				(m.m[1] + m.m[4]) / s
			);
		}
	}
};


lib3dmath.Quat.prototype = {
	magnitude: function() {
		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );
	},

	normalize: function() {
		var magnitude = this.magnitude( q );
		if( magnitude > 0.0 ) {
			this.w /= magnitude;
			this.x /= magnitude;
			this.y /= magnitude;
			this.z /= magnitude;
		}
	},

	add: function( q ) {
		return new Quat(
			this.x + q.x,
			this.y + q.y,
			this.z + q.z,
			this.w + q.w
		);
	},

	multiply: function( q ) {
		return new Quat(
			this.w * q.x + this.x * q.w - this.y * q.z + this.z * q.y,
			this.w * q.y + this.x * q.z + this.y * q.w - this.z * q.x,
			this.w * q.z - this.x * q.y + this.y * q.x + this.z * q.w,
			this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z
		);
	},

	scale: function( s ) {
		this.x *= s;;
		this.y *= s;
		this.z *= s;
		this.w *= s;
	},

	dotProduct: function( q ) { /* 1 := similiar rotations */
		return this.x * q.x + this.y * q.y + this.z * q.z + this.w * q.w;
	},

	conjugate: function( q ) {
		return new Quat(
			-q.x,
			-q.y,
			-q.z,
			 q.w
		);
	},

	rotate: function( v ) {
		var q_v = Quat.fromVector( v );

		var q_inverse = this.conjugate( );
		var q_v_inverse = q_v.multiply( q_inverse );
		var q_result = q.multiply( q_v_inverse );

		return new Vec4( q_result.x, q_result.y, q_result.z, 0.0 );
	},

	toMat3: function( ) {
		return new lib3dmath.Mat3(
			1-2*this.y*this.y-2*this.z*this.z,  2*this.x*this.y+2*this.w*this.z,   2*this.x*this.z-2*this.w*this.y,
			2*this.x*this.y-2*this.w*this.z,    1-2*this.x*this.x-2*this.z*this.z, 2*this.y*this.z+2*this.w*this.x,
			2*this.x*this.z+2*this.w*this.y,    2*this.y*this.z-2*this.w*this.x,   1-2*this.x*this.x-2*this.y*this.y
		);
	},

	toMat4: function( ) {
		return new lib3dmath.Mat4(
			1-2*this.y*this.y-2*this.z*this.z,  2*this.x*this.y+2*this.w*this.z,   2*this.x*this.z-2*this.w*this.y,   0.0,
			2*this.x*this.y-2*this.w*this.z,    1-2*this.x*this.x-2*this.z*this.z, 2*this.y*this.z+2*this.w*this.x,   0.0,
			2*this.x*this.z+2*this.w*this.y,    2*this.y*this.z-2*this.w*this.x,   1-2*this.x*this.x-2*this.y*this.y, 0.0,
			0.0,                                0.0,                               0.0,                               1.0
		);
	},

	angle: function( ) {
		return Math.acos( this.w ) * 2.0;
	},

	extractAxisAndAngle: function( axis, angle ) {
		angle = Math.acos( this.w ) * 2.0;
		var sin_angle = Math.sin( 0.5 * angle );

		axis.x = this.x / sin_angle;
		axis.y = this.y / sin_angle;
		axis.z = this.z / sin_angle;

		if( axis instanceof Vec4 ) {
			axis.w = 0.0;
		}
	},
};

/*
 * Transformations
 */
lib3dmath.transforms = {

	translate: function( t ) {
		return new lib3dmath.Mat4(
			 1.0,  0.0,  0.0,  0.0,
			 0.0,  1.0,  0.0,  0.0,
			 0.0,  0.0,  1.0,  0.0,
			 t.x,  t.y,  t.z,  1.0
		);
	},

	rotateX: function( a ) {
		var s = Math.sin( a );
		var c = Math.cos( a );

		return new lib3dmath.Mat4(
			1.0, 0.0, 0.0, 0.0,
			0.0,   c,  -s, 0.0,
			0.0,   s,   c, 0.0,
			0.0, 0.0, 0.0, 1.0
		);
	},

	rotateY: function( a ) {
		var s = Math.sin( a );
		var c = Math.cos( a );

		return new lib3dmath.Mat4(
			  c, 0.0,   s, 0.0,
			0.0, 1.0, 0.0, 0.0,
			 -s, 0.0,   c, 0.0,
			0.0, 0.0, 0.0, 1.0
		);
	},

	rotateZ: function( a ) {
		var s = Math.sin( a );
		var c = Math.cos( a );

		return new lib3dmath.Mat4(
			  c,  -s, 0.0, 0.0,
			  s,   c, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0
		);
	},

	rotateFromVectorToVector: function( s, t ) {
		var v = s.crossProduct( t );
		var e = s.dotProduct( t );
		var h = 1 / (1 + e);

		return new lib3dmath.Mat4(
			  e + h * v.x * v.x,   h * v.x * v.y + v.z,   h * v.x * v.z - v.y,  0,
			h * v.x * v.y - v.z,     e + h * v.y * v.y,   h * v.y * v.z + v.x,  0,
			h * v.x * v.z + v.y,   h * v.y * v.z - v.x,     e + h * v.z * v.z,  0,
							  0,                     0,                     0,  1
		);
	},

	scale: function( s ) {
		if( s instanceof Number ) {
			return new lib3dmath.Mat4(
				 s,    0.0,  0.0,  0.0,
				 0.0,    s,  0.0,  0.0,
				 0.0,  0.0,    s,  0.0,
				 0.0,  0.0,  0.0,  1.0
			);
		}
		else {
			return new lib3dmath.Mat4(
				 s.x,  0.0,  0.0,  0.0,
				 0.0,  s.y,  0.0,  0.0,
				 0.0,  0.0,  s.z,  0.0,
				 0.0,  0.0,  0.0,  1.0
			);
		}
	},

	shear: function( s ) {
		return new lib3dmath.Mat4(
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			  s, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0
		);
	},

	/* Beware of gimbal lock when any angle is set to +/- HALF_PI */
	eulerTransform: function( h, p, r ) {
		var sin_h = Math.sin( h );
		var cos_h = Math.cos( h );
		var sin_p = Math.sin( p );
		var cos_p = Math.cos( p );
		var sin_r = Math.sin( r );
		var cos_r = Math.cos( r );

		return new lib3dmath.Mat4(
			cos_r * cos_h - sin_r * sin_p * sin_h,   sin_r * cos_h + cos_r * sin_p * sin_h,   -cos_p * sin_h,   0,
								   -sin_r * cos_p,                           cos_r * cos_p,            sin_p,   0,
			cos_r * sin_h + sin_r * sin_p * cos_h,   sin_r * sin_h - cos_r * sin_p * cos_h,    cos_p * cos_h,   0,
												0,                                       0,                0,   1
		);
	},

	orientation: function( f, l, u ) {
		f.normalize();
		l.normalize();
		u.normalize();

		return new lib3dmath.Mat4(
			l.x,   l.y,  l.z,  0.0,
			u.x,   u.y,  u.z,  0.0,
			f.x,   f.y,  f.z,  0.0, // TODO: Check if this should be negative forward vector
			0.0,   0.0,  0.0,  1.0
		);
	},

	changeHandedness: function() {
		// convert from our coordinate system (looking down X)
		// to OpenGL's coordinate system (looking down -Z)
		return new lib3dmath.Mat4(
			 0, 0, -1, 0,
			-1, 0,  0, 0,
			 0, 1,  0, 0,
			 0, 0,  0, 1
		);
	},


	rigidBodyTransform: function( orientation, translation ) {
		return translation.multiplyMatrix( orientation );
	},
	

	lookAt: function( eye, target, up ) {
		var z = new lib3dmath.Vec3( target.x - eye.x, target.y - eye.y, target.z - eye.z );
		z.normalize( );

		var x = z.crossProduct( up );
		x.normalize( );

		var y = x.crossProduct( z );
		y.normalize( );

		return new lib3dmath.Mat4(
			   x.x,     x.y,     x.z,  0.0, /* x-axis */
			   y.x,     y.y,     y.z,  0.0, /* y-axis */
			  -z.x,    -z.y,    -z.z,  0.0, /* z-axis */
		    -eye.x,  -eye.y,  -eye.z,  1.0  /* translation */
		);
	},

};

/*
 * Projections
 */
lib3dmath.transforms.projections = {
	orthographic: function( left, right, bottom, top, near, far ) {
		return new lib3dmath.Mat4(
			2.0 / (right - left)          , 0.0                           ,  0.0                      , 0.0,
			0.0                           , 2.0 / (top - bottom)          ,  0.0                      , 0.0,
			0.0                           , 0.0                           , -2.0 / (far - near)       , 0.0,
			-(right + left)/(right - left), -(top + bottom)/(top - bottom), -(far + near)/(far - near), 1.0
		);
	},

	frustum: function( left, right, bottom, top, near, far ) {
		var A = 2.0 * near / (right - left);
		var B = (right + left) / (right - left);
		var C = 2.0 * near / (top - bottom);
		var D = (top + bottom) / (top - bottom);
		var E = -(far + near) / (far - near);
		var F = -(2.0 * far * near) / (far - near);

		return new lib3dmath.Mat4(
			  A,  0.0,    B,  0.0,
			0.0,    C,    D,  0.0,
			0.0,  0.0,    E,    F,
			0.0,  0.0, -1.0,  0.0
		);
	},

	perspective: function( fov, aspect, near, far ) {
		var A = 1.0 / tan(fov * 0.5);
		var B = -far / (far - near);
		var C = -(far * near)/ (far - near);

		return new lib3dmath.Mat4(
			A/aspect,  0.0,  0.0,  0.0,
				 0.0,    A,  0.0,  0.0,
				 0.0,  0.0,    B, -1.0,
				 0.0,  0.0,    C,  0.0
		);
	},
};

lib3dmath.tools = {

	normalFromTrianangle: function( v1, v2, v3 ) {
		var vec1 = new lib3dmath.Vec3( v2.x - v1.x, v2.y - v1.y, v2.z - v1.z );
		var vec2 = new lib3dmath.Vec3( v3.x - v1.x, v3.y - v1.y, v3.z - v1.z );
		var normal = vec1.crossProduct( vec2 );
		normal.normalize();
		return normal;
	},

	normalFromTriangles: function( points ) {
		/*
		 * Every vertex is generally shared among 6 triangles.  We calculate the
		 * normal of each triangle and average them together to calculate the
		 * normal at vertex 0.
		 *
		 *                             1--2--*
		 *  The numbers are the        |\ |\ |
		 *  vertices that are members  | \| \|
		 *  of the 6 triangles shared  6--0--3
		 *  by vertex 0.               |\ |\ |
		 *                             | \| \|
		 *                             *--5--4
		 *
		 * This function extends this idea to an arbitrary number of triangles.
		 */
		var number_of_triangles = points.length / 3;

		var normal = lib3dmath.Vec3.ZERO;

		for( var i = 0; i < points.length; i += 3 )
		{
			var n = lib3dmath.tools.normalFromTrianangle( points[ i + 0], points[ i + 1 ], points[ i + 2 ] );

			if( normal.dotProduct( n ) < 0.0 )
			{
				/* Vector n is in opposite direction to
				 * accumulated normal. This happens when the points
				 * winding is not consistent.
				 */
				n.negate();
			}

			normal = normal.add( n );
		}

		return normal.multiply( 1.0 / number_of_triangles );
	},

	/* Point in screen space to world space */
	pointUnproject: function( point, projection, model, viewport ) {
		/* Convert to normalized device coordinates */
		var normalized_device_coordinate = new lib3dmath.Vec4( ((point.x * 2.0) / viewport[2]) - 1.0, ((point.y * 2.0) / viewport[3]) - 1.0, 0.0, 1.0 );

		var inv_projmodel = projection.multiplyMatrix( model );
		inv_projmodel.invert( );

		return inv_projmodel.multiplyVector( normalized_device_coordinate );
	},

	/* Point in world space to screen space */
	pointProject: function( point, projection, model, viewport ) {
		var projmodel = projection.multiplyMatrix( model );
		var pt = projmodel.multiplyMatrix( point );

		return new lib3dmath.Vec2( ((1.0 + pt.x) * viewport[2]) / 2.0, ((1.0 + pt.y) * viewport[3]) / 2.0 );
	},
};
