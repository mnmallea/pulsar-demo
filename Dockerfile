FROM node:fermium-buster

WORKDIR /tmp

RUN curl "https://apache.dattatec.com/pulsar/pulsar-2.6.2/DEB/apache-pulsar-client.deb" -o pulsar-client.deb
RUN curl "https://apache.dattatec.com/pulsar/pulsar-2.6.2/DEB/apache-pulsar-client-dev.deb" -o pulsar-client-dev.deb
RUN apt install ./pulsar-client.deb
RUN apt install ./pulsar-client-dev.deb

RUN mkdir -p /var/app
WORKDIR /var/app
COPY package*.json ./
RUN npm install
