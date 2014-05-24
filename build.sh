#!/bin/sh

cat license.js > tmp
cat mathematics.js >> tmp
cat vec2.js >> tmp
cat vec3.js >> tmp
cat vec4.js >> tmp
cat mat2.js >> tmp
cat mat3.js >> tmp
cat mat4.js >> tmp
cat quat.js >> tmp

jsmin < tmp > lib3dmath.js
rm tmp
