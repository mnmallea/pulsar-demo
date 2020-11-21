package main

import (
	"fmt"
	"log"

	"github.com/apache/pulsar-client-go/pulsar"
)

func subscribe(client pulsar.Client, topic string) (pulsar.Consumer, error) {
	return client.Subscribe(pulsar.ConsumerOptions{
		Topic:            topic,
		SubscriptionName: "subscription_1",
		Type:             pulsar.Shared,
	})
}

func main() {
	client, err := pulsar.NewClient(pulsar.ClientOptions{URL: "pulsar://pulsar:6650"})
	if err != nil {
		log.Fatal(err)
	}

	defer client.Close()

	if err != nil {
		log.Fatal(err)
	}

	consumer, err := subscribe(client, "orders");

	if err != nil {
		log.Fatal(err)
	}

	defer consumer.Close()

	channel := consumer.Chan()
	
	for msg := range(channel) {
		fmt.Printf("Received message msgId: %#v -- content: '%s'\n",
			msg.ID(), string(msg.Payload()))
		consumer.Ack(msg)
	}

	if err := consumer.Unsubscribe(); err != nil {
		log.Fatal(err)
	}
}
