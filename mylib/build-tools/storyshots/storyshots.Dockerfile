# It's not supposed to be used where it is
# GitHub workflows runs this Dockerfile agains the root folder of the JS project

ARG BASE_IMAGE
FROM $BASE_IMAGE

USER $APP_USER
WORKDIR /app

COPY --chown=$APP_USER:$APP_GROUP . .
RUN \
    echo "node: $(node --version)" && \
    echo "npm:  $(npm --version)" && \
    npm run shot-server-start && \
    npx jest --config=build-tools/jest/jest.config.shots.js --ci && \
    npm run shot-server-stop || (npm run shot-server-stop && false)
