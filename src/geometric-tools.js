m3d.tools = {

	normalFromTrianangle: function( v1, v2, v3 ) {
		let vec1 = new m3d.Vec3( v2.x - v1.x, v2.y - v1.y, v2.z - v1.z );
		let vec2 = new m3d.Vec3( v3.x - v1.x, v3.y - v1.y, v3.z - v1.z );
		let normal = vec1.crossProduct( vec2 );
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
		let number_of_triangles = points.length / 3;

		let normal = m3d.Vec3.ZERO;

		for( let i = 0; i < points.length; i += 3 )
		{
			let n = m3d.tools.normalFromTrianangle( points[ i + 0], points[ i + 1 ], points[ i + 2 ] );

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
		let normalized_device_coordinate = new m3d.Vec4( ((point.x * 2.0) / viewport[2]) - 1.0, ((point.y * 2.0) / viewport[3]) - 1.0, 0.0, 1.0 );

		let inv_projmodel = projection.multiplyMatrix( model );
		inv_projmodel.invert( );

		return inv_projmodel.multiplyVector( normalized_device_coordinate );
	},

	/* Point in world space to screen space */
	pointProject: function( point, projection, model, viewport ) {
		let projmodel = projection.multiplyMatrix( model );
		let pt = projmodel.multiplyMatrix( point );

		return new m3d.Vec2( ((1.0 + pt.x) * viewport[2]) / 2.0, ((1.0 + pt.y) * viewport[3]) / 2.0 );
	},
};
