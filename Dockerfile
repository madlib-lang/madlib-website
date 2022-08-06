FROM node:18
WORKDIR /home/madlib-website


COPY . .

# install common dependencies
RUN apt-get update --fix-missing
# DEBIAN_FRONTEND=noninteractive is necessary to skip geographical questions asked when installing cmake
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y curl zip unzip wget automake libtool unzip cmake build-essential


RUN npm i -g @madlib-lang/madlib nps

RUN npm i
RUN madlib install

RUN SERVER_BASE_URL="http://46.101.219.54" nps build.prod

CMD ./build/service 80
