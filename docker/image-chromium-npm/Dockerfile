FROM ghcr.io/umputun/baseimage/app:v1.8.0

ENV \
    APP_GROUP=$APP_USER \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN \
    apk add --no-cache --update \
        nss \
        freetype \
        freetype-dev \
        harfbuzz \
        ttf-freefont \
        chromium \
        npm \
        && \
    apk add --no-cache --update \
        --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community \
        font-noto \
        font-noto-emoji \
        && \
    apk add --no-cache --update \
        --repository=http://dl-cdn.alpinelinux.org/alpine/edge/testing \
        wqy-zenhei \
        && \
    mkdir /app && chown $APP_USER:$APP_USER /app && \
    rm -rf /var/cache/apk/*

