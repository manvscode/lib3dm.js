function quat( x, y, z, w ) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
}

quat.prototype.magnitude = function() {
    return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );
};

quat.prototype.normalize = function() {
	var magnitude = quat_magnitude( q );
	this.w /= magnitude;
	this.x /= magnitude;
	this.y /= magnitude;
	this.z /= magnitude;
};

quat.from_axis_angle = function( axis, angle ) {
	var q = new quat(
		Math.cos( angle / 2.0 ),
		axis.x * Math.sin( angle / 2.0 ),
		axis.y * Math.sin( angle / 2.0 ),
		axis.z * Math.sin( angle / 2.0 )
	);
	q.normalize( );
	return q;
};

quat.from_vec = function( v ) {
	return new quat(
		v.x,
		v.y,
		v.z,
		0.0
	);
};

quat.from_mat3 = function( m ) {
	var trace = m.m[0] + m.m[4] + m.m[8]; /* add the diagonal values */

	if( trace > 0.0 )
	{
		var s = 0.5 / Math.sqrt( trace );

		return new quat(
			0.25 / s,
			(m.m[7] - m.m[5]) * s,
			(m.m[2] - m.m[6]) * s,
			(m.m[3] - m.m[1]) * s
		);
	}
	else
	{
		var max_diagonal_elem = maxf( m.m[0], maxf( m.m[4], m.m[8] ) );

		if( Math.abs(m.m[0] - max_diagonal_elem) < SCALAR_EPSILON )
		{
			var s = Math.sqrt( 1.0 + m.m[0] - m.m[4] - m.m[8] ) * 2.0;

			return new quat(
				0.5 / s,
				(m.m[1] + m.m[3]) / s,
				(m.m[2] + m.m[6]) / s,
				(m.m[5] + m.m[7]) / s
			);
		}
		else if( Math.abs(m.m[4] - max_diagonal_elem) < SCALAR_EPSILON )
		{
			var s = Math.sqrt( 1.0 + m.m[4] - m.m[0] - m.m[8] ) * 2.0;

			return new quat(
				(m.m[1] + m.m[3]) / s,
				0.5 / s,
				(m.m[5] + m.m[7]) / s,
				(m.m[2] + m.m[6]) / s
			);
		}
		else
		{
			var s = Math.sqrt( 1.0 + m.m[8] - m.m[0] - m.m[4] ) * 2.0;

			return new quat(
				(m.m[2] + m.m[6]) / s,
				(m.m[5] + m.m[7]) / s,
				0.5 / s,
				(m.m[1] + m.m[3]) / s
			);
		}
	}
};

quat.from_mat4 = function( m ) {
	var trace = m.m[0] + m.m[5] + m.m[10] + 1; /* add the diagonal values */

	if( trace > 0.0 )
	{
		var s = 0.5 / Math.sqrt( trace );

		return new quat(
			0.25 / s,
			(m.m[9] - m.m[6]) * s,
			(m.m[2] - m.m[8]) * s,
			(m.m[4] - m.m[1]) * s
		);
	}
	else
	{
		var max_diagonal_elem = maxf( m.m[0], maxf( m.m[5], m.m[10] ) );

		if( Math.abs(m.m[0] - max_diagonal_elem) < SCALAR_EPSILON )
		{
			var s = Math.sqrt( 1.0 + m.m[0] - m.m[5] - m.m[10] ) * 2.0;

			return new quat(
				0.5 / s,
				(m.m[1] + m.m[4]) / s,
				(m.m[2] + m.m[8]) / s,
				(m.m[6] + m.m[9]) / s
			);
		}
		else if( Math.abs(m.m[5] - max_diagonal_elem) < SCALAR_EPSILON )
		{
			var s = Math.sqrt( 1.0 + m.m[5] - m.m[0] - m.m[10] ) * 2.0;

			return new quat(
				(m.m[1] + m.m[4]) / s,
				0.5 / s,
				(m.m[6] + m.m[9]) / s,
				(m.m[2] + m.m[8]) / s
			);
		}
		else
		{
			var s = Math.sqrt( 1.0 + m.m[10] - m.m[0] - m.m[5] ) * 2.0;

			return new quat(
				(m.m[2] + m.m[8]) / s,
				(m.m[6] + m.m[9]) / s,
				0.5 / s,
				(m.m[1] + m.m[4]) / s
			);
		}
	}
};

quat.from_mat = function( m ) {
	if( m instanceof mat3 ) {
		return quat.from_mat3( m );
	}
	else {
		return quat.from_mat4( m );
	}
};

quat.prototype.add = function( q ) {
	return new quat(
		this.x + q.x,
		this.y + q.y,
		this.z + q.z,
		this.w + q.w
	);
};

quat.prototype.multiply = function( q ) {
	return new quat(
		this.w * q.x + this.x * q.w - this.y * q.z + this.z * q.y,
		this.w * q.y + this.x * q.z + this.y * q.w - this.z * q.x,
		this.w * q.z - this.x * q.y + this.y * q.x + this.z * q.w,
		this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z
	);
};

quat.prototype.scale = function( s ) {
	this.x *= s;;
	this.y *= s;
	this.z *= s;
	this.w *= s;
};


quat.prototype.dot_product = function( q ) { /* 1 := similiar rotations */
    return this.x * q.x + this.y * q.y + this.z * q.z + this.w * q.w;
};

quat.prototype.conjugate = function( q ) {
	return new quat(
		-q.x,
		-q.y,
		-q.z,
		 q.w
	);
};

quat.prototype.rotate = function( v ) {
	var q_v = quat.from_vec( v );

	var q_inverse = this.conjugate( );
	var q_v_inverse = q_v.multiply( q_inverse );
	var q_result = q.multiply( q_v_inverse );

	return new vec4( q_result.x, q_result.y, q_result.z, 0.0 );
};

quat.prototype.to_mat3 = function( ) {
	return new mat3(
		1-2*this.y*this.y-2*this.z*this.z,  2*this.x*this.y+2*this.w*this.z,   2*this.x*this.z-2*this.w*this.y,
		2*this.x*this.y-2*this.w*this.z,    1-2*this.x*this.x-2*this.z*this.z, 2*this.y*this.z+2*this.w*this.x,
		2*this.x*this.z+2*this.w*this.y,    2*this.y*this.z-2*this.w*this.x,   1-2*this.x*this.x-2*this.y*this.y
	);
};

quat.prototype.to_mat4 = function( ) {
	return new mat4(
		1-2*this.y*this.y-2*this.z*this.z,  2*this.x*this.y+2*this.w*this.z,   2*this.x*this.z-2*this.w*this.y,   0.0,
		2*this.x*this.y-2*this.w*this.z,    1-2*this.x*this.x-2*this.z*this.z, 2*this.y*this.z+2*this.w*this.x,   0.0,
		2*this.x*this.z+2*this.w*this.y,    2*this.y*this.z-2*this.w*this.x,   1-2*this.x*this.x-2*this.y*this.y, 0.0,
		0.0,                                0.0,                               0.0,                               1.0
	);
};

quat.prototype.angle = function( ) {
	return Math.acos( this.w ) * 2.0;
};

quat.prototype.extract_axis_and_angle = function( axis, angle ) {
	angle = Math.acos( this.w ) * 2.0;
	var sin_angle = Math.sin( 0.5 * angle );

	axis.x = this.x / sin_angle;
	axis.y = this.y / sin_angle;
	axis.z = this.z / sin_angle;

	if( axis instanceof vec4 ) {
		axis.w = 0.0;
	}
};

