const { inspect } = require('util');
const { v4: uuidv4 } = require('uuid');

const client = require('./client');

const MESSAGE_DELAY_MS = 2000;

const sleep = (ms) => new Promise(resolve => {
  setTimeout(() => resolve(), ms);
});

const produceMessages = async producer => {
  while (true) {
    const message = JSON.stringify({ id: uuidv4() });
    console.log(`Sending message: ${message}`)
    await producer.send({
      data: Buffer.from(message),
    });
    await sleep(MESSAGE_DELAY_MS);
  }
}

client.createProducer({
  topic: 'orders',
})
  .catch(e => {
    console.error(`Error when creating producer: ${inspect(e)}`);
    process.exit(1);
  })
  .then(producer => {
    console.log('Producer created');
    return produceMessages(producer);
  })
  .catch(e => console.error(inspect(e)));
