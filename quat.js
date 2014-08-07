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
