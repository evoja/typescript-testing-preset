# It's not supposed to be used where it is
# GitHub workflows runs this Dockerfile agains the root folder of the JS project

ARG BASE_IMAGE
FROM $BASE_IMAGE

# Configure environment:
ENV \
    APP_GROUP=$APP_USER \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    CHIV_CONTENT_PATH=/app/content \
    PRE_BUILD_PATH=/pre-build
RUN mkdir /app && chown $APP_USER:$APP_USER /app
USER $APP_USER

WORKDIR /app
#ENTRYPOINT ["/bin/sh", "/app/run-gh-build.sh"]

COPY --chown=$APP_USER:$APP_GROUP . .
RUN \
    node --version && \
    npm --version && \
    ls -la && \
    npm run shot-server-start && \
    npx jest --config=build-tools/jest.config.shots.js --ci && \
    npm run shot-server-stop || (npm run shot-server-stop && false)
