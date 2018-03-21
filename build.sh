#!/bin/sh

# Combine all the pieces
cat mathematics.js > tmp
echo >> tmp
cat vec2.js >> tmp
echo >> tmp
cat vec3.js >> tmp
echo >> tmp
cat vec4.js >> tmp
echo >> tmp
cat mat2.js >> tmp
echo >> tmp
cat mat3.js >> tmp
echo >> tmp
cat mat4.js >> tmp
echo >> tmp
cat quat.js >> tmp
echo >> tmp
cat transforms.js >> tmp
echo >> tmp
cat geometric-tools.js >> tmp

# Build client-side debug version
cat license.js > lib3dmath.js
cat tmp >> lib3dmath.js
cp lib3dmath.js index.js
echo "\nmodule.exports = lib3dmath;" >> index.js

# Build client-side minified version
cat license.js > lib3dmath.min.js
jsmin < lib3dmath.js >> lib3dmath.min.js

# Clean up
rm tmp
