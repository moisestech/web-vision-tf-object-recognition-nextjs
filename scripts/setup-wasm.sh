#!/bin/bash
# Copy TensorFlow.js WASM files to public directory

set -e

WASM_SRC="node_modules/@tensorflow/tfjs-backend-wasm/dist"
WASM_DEST="public/tfjs"

if [ ! -d "$WASM_SRC" ]; then
  echo "Error: $WASM_SRC not found. Run 'npm install' first."
  exit 1
fi

mkdir -p "$WASM_DEST"
cp "$WASM_SRC"/*.wasm "$WASM_DEST/" 2>/dev/null || {
  echo "Warning: No .wasm files found in $WASM_SRC"
  echo "This is normal if using a different TensorFlow.js version."
  echo "Check the TensorFlow.js documentation for WASM file locations."
}

echo "WASM files copied to $WASM_DEST"
ls -lh "$WASM_DEST"/*.wasm 2>/dev/null || echo "No WASM files copied"

