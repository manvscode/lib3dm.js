#!/bin/sh

cat mathematics.js > tmp
cat vec2.js >> tmp
cat vec3.js >> tmp
cat vec4.js >> tmp
cat mat2.js >> tmp
cat mat3.js >> tmp
cat mat4.js >> tmp
cat quat.js >> tmp

cat license.js > lib3dmath.js
jsmin < tmp >> lib3dmath.js
rm tmp

#mv tmp lib3dmath.js
