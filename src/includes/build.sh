#!/bin/bash

set -e

export OPTIMIZE="-Os"
export LDFLAGS="${OPTIMIZE}"
export CFLAGS="${OPTIMIZE}"
export CXXFLAGS="${OPTIMIZE}"

echo "============================================="
echo "Compiling wasm bindings"
echo "============================================="
(
  # Compile C/C++ code
  emcc \
    ${OPTIMIZE} \
    --bind \
    -s STRICT=1 \
    -s ALLOW_MEMORY_GROWTH=1 \
    -s MALLOC=emmalloc \
    -s MODULARIZE=1 \
    -s EXPORT_ES6=1 \
    -o src/wasm/main.js \
    src/wasm/main.cpp

  # Move artifacts
  mv src/wasm/main.wasm ./build/static/js
)
echo "============================================="
echo "Compiling wasm bindings done"
echo "============================================="