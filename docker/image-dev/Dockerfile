ARG BASE_IMAGE
FROM $BASE_IMAGE

RUN \
    apk add --no-cache --update \
        sudo bash rsync git \
        && \
    echo "%wheel ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers && \
    addgroup ${APP_USER} wheel && \
    rm -rf /var/cache/apk/*

USER $APP_USER
WORKDIR /app/js
ENTRYPOINT ["/bin/sh", "/app/init.sh"]
COPY --chown=$APP_USER:$APP_GROUP init.sh /app/init.sh

RUN \
    ln -s /persistent-home/.ash_history /home/$APP_USER/.ash_history && \
    ln -s /persistent-home/.bash_history /home/$APP_USER/.bash_history
