/*
 * 2D matrix
 */
m3d.Mat2 = function( a, b, c, d ) {
	if( this instanceof m3d.Mat2) {
		this.m = [a || 0, b || 0,
		          c || 0, d || 0];
	}
	else {
		return new m3d.Mat2( a, b, c, d );
	}
};

m3d.Mat2.prototype = {
	identity: function( ) {
		return this.m = m3d.Mat2.IDENITY;
	},

	zero: function( ) {
		return this.m = m3d.Mat2.ZERO;
	},

	determinant: function( ) {
		return this.m[ 0 ] * this.m[ 3 ] - this.m[ 1 ] * this.m[ 2 ];
	},

	multiplyMatrix: function( m ) {
		return new m3d.Mat2(
			this.m[ 0 ] * m.m[ 0 ] + this.m[ 2 ] * m.m[ 1 ],
			this.m[ 1 ] * m.m[ 0 ] + this.m[ 3 ] * m.m[ 1 ],
			this.m[ 0 ] * m.m[ 2 ] + this.m[ 2 ] * m.m[ 3 ],
			this.m[ 1 ] * m.m[ 2 ] + this.m[ 3 ] * m.m[ 3 ]
		);
	},

	multiplyVector: function( v ) {
		return new m3d.Vec2(
			this.m[ 0 ] * v.x + this.m[ 2 ] * v.y,
			this.m[ 1 ] * v.x + this.m[ 3 ] * v.y
		);
	},

	multiply: function( o ) {
		if( o instanceof m3d.Vec2 ) {
			return this.multiplyVector( o );
		}
		else {
			return this.multiplyMatrix( o );
		}
	},

	invert: function( ) {
		let det = this.determinant( );

		if( det > Number.EPSILON )
		{
			{
				let tmp = this.m[ 0 ];
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
		let tmp = this.m[ 1 ];
		this.m[ 1 ] = this.m[ 2 ];
		this.m[ 2 ] = tmp;
	},

	x_vector: function() {
		let arr = this.m.slice( 0, 2 );
		return new m3d.Vec2( arr[0], arr[1] );
	},

	y_vector: function() {
		let arr = this.m.slice( 2, 4 );
		return new m3d.Vec2( arr[0], arr[1] );
	},

	toString: function( ) {
		return "|" + m3d.format(this.m[0]) + " " + m3d.format(this.m[2]) + "|\n" +
			   "|" + m3d.format(this.m[1]) + " " + m3d.format(this.m[3]) + "|\n";
	},
};

m3d.Mat2.IDENTITY = (function() {
	let i = new m3d.Mat2( 1, 0,
	                  0, 1 );
	Object.freeze( i );
	return i;
}());

m3d.Mat2.ZERO = (function() {
	let z = new m3d.Mat2( 0, 0,
	                  0, 0 );
	Object.freeze( z );
	return z;
}());
