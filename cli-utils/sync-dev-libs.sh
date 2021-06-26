#!/bin/sh
DIR="$( cd "$( dirname "$0" )" && pwd )"
CUR=$(pwd)
DOCKER=$DIR/../docker
JS_PROJ=$DIR/../${1:-mylib}
export $(cat $DOCKER/ci.env | grep -v "^#\|^$" | xargs)

docker run \
    --rm \
    -v ${PROJECT_NAME}_libs:/from \
    -v $JS_PROJ/node_modules:/to \
    --entrypoint /bin/sh \
    $DEV_MAGE \
    -c "rsync -la --no-perms --omit-dir-times /from/ /to"
