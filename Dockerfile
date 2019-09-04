FROM arm32v7/debian:stretch-slim
WORKDIR ./



RUN apt-get update;\
    apt-get install qemu qemu-user-static binfmt-support nginx -y;

COPY ./nginx.production.conf /etc/nginx/nginx.conf
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY  dist/gh-frontend/ .

EXPOSE 80 443

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
