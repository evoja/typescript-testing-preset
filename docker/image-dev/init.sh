#!/bin/sh
set -e
SKIP_MYINSTALL=$1
echo "Initializing at $(date)"
if [[ -z $SKIP_MYINSTALL ]]; then
    npm run myci
    rm -f node_modules/react-bootstrap/node_modules/@types/react/*.d.ts
fi;

# Entering the developer's shell
echo "-------------------------------"
echo "Welcome to developer container"
echo "-------------------------------"
echo "npm  : $(npm --version)"
echo "node : $(node --version)"
echo "-------------------------------"
echo ""
exec /bin/bash
