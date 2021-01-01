ARG BASE_IMAGE
FROM $BASE_IMAGE

# Configure environment:
ENV \
    APP_GROUP=$APP_USER \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    CHIV_CONTENT_PATH=/app/content \
    PRE_BUILD_PATH=/pre-build
USER $APP_USER

WORKDIR /app/js
ENTRYPOINT ["/bin/sh", "/app/init.sh"]
COPY --chown=$APP_USER:$APP_GROUP init.sh /app/init.sh

RUN \
    ln -s /persistent-home/.ash_history /home/$APP_USER/.ash_history && \
    ln -s /persistent-home/.bash_history /home/$APP_USER/.bash_history
