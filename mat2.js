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
