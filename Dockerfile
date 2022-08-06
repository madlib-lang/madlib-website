FROM node:18

COPY . .

# install common dependencies
RUN apt-get update --fix-missing
# DEBIAN_FRONTEND=noninteractive is necessary to skip geographical questions asked when installing cmake
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y curl llvm-9 zip unzip wget automake libtool clang gcc-9 g++-9 libstdc++-9-dev libc++abi-9-dev unzip musl-tools cmake git nasm libssl-dev build-essential libffi-dev libffi7 libgmp-dev libgmp10 libncurses-dev libncurses5 libtinfo5


RUN npm i -g @madlib-lang/madlib nps

RUN npm i
RUN madlib install

RUN SERVER_BASE_URL="http://localhost:80" nps build.prod

CMD ./build/service 80
