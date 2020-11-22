const client = require('./client');

const sleep = (ms) => new Promise(resolve => {
  setTimeout(() => resolve(), ms);
});

const main = async () => {
  // Create a producer
  const producer = await client.createProducer({
    topic: 'orders',
  });
  
  while(true){
    const message = JSON.stringify({ status: 'ok' });
    console.log(`Sending message: ${message}`)
    await producer.send({
      data: Buffer.from(message),
    });
    await sleep(5000);
  }
};

main();
  