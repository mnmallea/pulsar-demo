const client = require('./client');

const main = async () => {
  const consumer = await client.subscribe({
    topic: 'orders',
    subscription: 'my-subscription',
  });
  console.log('Subscribed to topic');

  while(true){
    const msg = await consumer.receive();
    console.log(msg.getData().toString());
    consumer.acknowledge(msg);
  }
};

main()
