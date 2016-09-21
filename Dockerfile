FROM nodesource/jessie:6.3.1
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN echo "Love2"

# Create app directory
RUN mkdir -p /usr/src/Love2
WORKDIR /usr/src/Love2

RUN echo "Update system"

# Update system
RUN apt-get update -y
RUN apt-get upgrade -y

RUN npm install -g nodemon
RUN npm install -g mocha

COPY package.json /usr/src/Love2/

RUN npm install --quiet --production

COPY . /usr/src/Love2/

RUN node -v

EXPOSE 8080

CMD [ "npm", "start" ]