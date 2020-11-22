const { inspect } = require('util');

const client = require('./client');

const consumeMessages = async consumer => {
  while (true) {
    const msg = await consumer.receive();
    console.log(msg.getData().toString());
    consumer.acknowledge(msg);
  }
}

client.subscribe({
  topic: 'orders',
  subscription: 'sub_1',
  subscriptionType: 'Shared'
})
  .catch(e => {
    console.error(`Error when creating producer: ${inspect(e)}`);
    process.exit(1);
  })
  .then(consumer => {
    console.log('Subscribed to topic');
    consumeMessages(consumer);
  }).catch(e => console.error(inspect(e)))

