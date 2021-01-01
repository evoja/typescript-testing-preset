#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CUR=$(pwd)
DOCKER=$DIR/../docker
export $(cat $DOCKER/ci.env | grep -v "^#\|^$" | xargs)
DEV_IMAGE=${1:-dev-dev}
BASE_IMAGE=${2:-$DEV_BASE_IMAGE}

docker build \
    -t $DEV_IMAGE \
    -f $DOCKER/image-dev/Dockerfile \
    --build-arg BASE_IMAGE=$BASE_IMAGE \
    $DOCKER/image-dev
