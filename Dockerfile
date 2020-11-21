FROM golang:1.15-alpine

RUN mkdir -p /var/app
WORKDIR /var/app
RUN apk add --no-cache git gcc gcc musl-dev
RUN go get -u "github.com/apache/pulsar-client-go/pulsar"
