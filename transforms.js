
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
		if( s instanceof lib3dmath.Vec3 || s instanceof lib3dmath.Vec4 ) {
			return new lib3dmath.Mat4(
				 s.x,  0.0,  0.0,  0.0,
				 0.0,  s.y,  0.0,  0.0,
				 0.0,  0.0,  s.z,  0.0,
				 0.0,  0.0,  0.0,  1.0
			);
		}
		else {
			return new lib3dmath.Mat4(
				 s,    0.0,  0.0,  0.0,
				 0.0,    s,  0.0,  0.0,
				 0.0,  0.0,    s,  0.0,
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

	orientationMatrix4: function( f, l, u ) {
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

	orientationMatrix3: function( f, l, u ) {
		f.normalize();
		l.normalize();
		u.normalize();

		return new lib3dmath.Mat3(
			l.x,   l.y,  l.z,
			u.x,   u.y,  u.z,
			f.x,   f.y,  f.z // TODO: Check if this should be negative forward vector
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


	rigidBodyTransform: function( orientation, translation, scale = null ) {
        if( scale ) {
		    return translation.multiplyMatrix( orientation ).multiplyMatrix( scale );
        }
        else {
		    return translation.multiplyMatrix( orientation );
        }
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
		var A = 1.0 / Math.tan(fov * 0.5);
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

