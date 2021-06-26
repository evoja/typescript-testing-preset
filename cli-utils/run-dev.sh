#!/bin/sh
DIR="$( cd "$( dirname "$0" )" && pwd )"
CUR=$(pwd)
DOCKER=$DIR/../docker
export $(cat $DOCKER/ci.env | grep -v "^#\|^$" | xargs)
export DEV_IMAGE=${1:-$DEV_IMAGE}
export JS_PROJ=$DIR/../${2:-mylib}
SKIP_MYINSTALL=$3

CMD=$@
if [[ $CMD == "init" ]]; then
    docker run \
        --rm \
        -v ${PROJECT_NAME}_libs:/libs \
        -v ${PROJECT_NAME}_persistent-home:/persistent-home \
        --entrypoint chown \
        $CHROMIUM_NPM_IMAGE \
        1001:1001 -R /libs /persistent-home
elif [[ $CMD == "vol" ]]; then
    docker volume create ${PROJECT_NAME}_libs
    docker volume create ${PROJECT_NAME}_persistent-home
    ${BASH_SOURCE[0]} init
else
    docker run \
        --rm -it \
        -v $JS_PROJ:/app/js \
        -v ${PROJECT_NAME}_libs:/app/js/node_modules \
        -v ${PROJECT_NAME}_persistent-home:/persistent-home \
        --name ${PROJECT_NAME} \
        -p 8080:8080 \
        $DEV_IMAGE $SKIP_MYINSTALL

fi
