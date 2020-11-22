const { Client } = require('pulsar-client');

module.exports = new Client({
  serviceUrl: process.env.PULSAR_URL || 'pulsar://pulsar:6650'
});
