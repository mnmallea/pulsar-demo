package main

import (
	"context"
	"log"
	"time"

	"github.com/apache/pulsar-client-go/pulsar"
)

func main() {
	client, err := pulsar.NewClient(pulsar.ClientOptions{
		URL: "pulsar://pulsar:6650",
	})

	if err != nil {
		log.Fatal(err)
	}

	defer client.Close()

	producer, err := client.CreateProducer(pulsar.ProducerOptions{
		Topic: "orders",
	})
	if err != nil {
		log.Fatal(err)
	}

	defer producer.Close()

	ctx := context.Background()

	for {
		if msgID, err := producer.Send(ctx, &pulsar.ProducerMessage{
			Payload: []byte(`{ "status": "delievered" }`),
		}); err != nil {
			log.Fatal(err)
		} else {
			log.Println("Published message: ", msgID)
		}
		time.Sleep(8 * time.Second)
	}
}
