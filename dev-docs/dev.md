# Dev

## When I return after several months of pause

### Run tests locally

Docker is required

* `./cli-utils/run-dev.sh vol` - prepare volumes
* `./cli-utils/run-dev.sh` - run dev image against `my-lib` project
* `npm run test`


### Update base image

* Go to [image-chromium-npm/Dockerfile](../docker/image-chromium-npm/Dockerfile)
and update `FROM` instruction there. Commit.
* Tag the commit with `img/XX` tag. Push the tag. Wait until GH-Actions complete.
* Upgrade [ci.env](../docker/ci.env) with new tagged images.

### Update NPM dependencies

Most probably I need to fix Webpack and Jest configs after the update.
