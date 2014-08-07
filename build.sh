#!/bin/sh

# Combine all the pieces
cat mathematics.js > tmp
cat vec2.js >> tmp
cat vec3.js >> tmp
cat vec4.js >> tmp
cat mat2.js >> tmp
cat mat3.js >> tmp
cat mat4.js >> tmp
cat quat.js >> tmp
cat transforms.js >> tmp
cat geometric-tools.js >> tmp

# Build debug version
cat license.js > lib3dmath.js
cat tmp >> lib3dmath.js

# Build minified version
cat license.js > lib3dmath.min.js
jsmin < lib3dmath.js >> lib3dmath.min.js

# Clean up
rm tmp
