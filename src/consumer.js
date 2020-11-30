const { inspect } = require('util');

const client = require('./client');
const { MEASUREMENTS_TOPIC } = require('./topics');

const consumeMessages = async consumer => {
  while (true) {
    const msg = await consumer.receive();
    console.log(msg.getData().toString());
    consumer.acknowledge(msg);
  }
}

const subscriptionName = process.env.SUBSCRIPTION_NAME || 'sub_1';
const subscriptionType = process.env.SUBSCRIPTION_TYPE || 'Shared';

console.log(`Creating subscription with name "${subscriptionName}" to topic "${MEASUREMENTS_TOPIC}" with type "${subscriptionType}"`);

client.subscribe({
  topic: MEASUREMENTS_TOPIC,
  subscription: subscriptionName,
  subscriptionType
})
  .catch(e => {
    console.error(`Error when creating producer: ${inspect(e)}`);
    process.exit(1);
  })
  .then(consumer => {
    console.log('Subscribed to topic');
    consumeMessages(consumer);
  }).catch(e => console.error(inspect(e)))

