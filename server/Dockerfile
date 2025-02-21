FROM node:20.18.3

WORKDIR ./

COPY ./ ./

RUN npm install -g pnpm@latest-10
RUN pnpm install

CMD ["/bin/bash"]