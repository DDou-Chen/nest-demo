# 多阶段构建的语法

# build stage
# 通过 FROM 继承镜像的时候，给当前镜像指定一个名字，比如 build-stage
# 基于 node 18 的镜像。
FROM node:18-alpine3.20 as build-stage

# 指定当前目录为容器内的 /app
WORKDIR /app

# 把 package.json 复制到容器里，设置淘宝的 npm registry，执行 npm install。
COPY package.json .
RUN npm config set registry https://registry.npmmirror.com/
RUN npm install

# 把其余的文件复制过去，执行 npm run build。
COPY . .
RUN npm run build

# 指定暴露的端口为 3000
# EXPOSE 3000

# CMD [ "node", "./dist/main.js" ]


# production stage
# 再通过 FROM 继承 node 镜像创建一个新镜像
FROM node:18-alpine3.20 as production-stage

# 通过 COPY --from-build-stage 从那个镜像内复制 /app/dist 的文件到当前镜像的 /app 下
COPY --from=build-stage /app/dist /app
# 把 package.json 也复制过来
COPY --from=build-stage /app/package.json /app/package.json

# 然后切到 /app 目录执行 npm install --production 只安装 dependencies 依赖
WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/

# 安装pm2来管理进程
RUN npm install pm2 -g

RUN npm install --production

EXPOSE 3000

# CMD ["node", "/app/main.js"]
CMD [ "pm2-runtime", "/app/main.js" ]





# Dockerfile 有挺多技巧：

# 使用 alpine 的镜像，而不是默认的 linux 镜像，可以极大减小镜像体积，比如 node:18-alpine3.20 这种
# 使用多阶段构建，比如一个阶段来执行 build，一个阶段把文件复制过去，跑起服务来，最后只保留最后一个阶段的镜像。这样使镜像内只保留运行需要的文件以及 dependencies。
# 使用 ARG 增加构建灵活性，ARG 可以在 docker build 时通过 --build-arg xxx=yyy 传入，在 dockerfile 中生效，可以使构建过程更灵活。如果是想定义运行时可以访问的变量，可以通过 ENV 定义环境变量，值使用 ARG 传入。
# CMD 和 ENTRYPOINT 都可以指定容器跑起来之后运行的命令，CMD 可以被覆盖，而 ENTRYPOINT 不可以，两者结合使用可以实现参数默认值的功能。
# ADD 和 COPY 都可以复制文件到容器内，但是 ADD 处理 tar.gz 的时候，还会做一下解压。