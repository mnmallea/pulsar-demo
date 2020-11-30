const axios = require('axios');

const { schema: measurementSchema } = require('./schemas/measurement');
const { MEASUREMENTS_TOPIC } = require('./topics');

const baseUrl = process.env.PULSAR_ADMIN_URL || 'http://pulsar:8080';

const createSchema = ({ tenant, namespace, topic, schema }) =>
  axios.post(`${baseUrl}/admin/v2/schemas/${tenant}/${namespace}/${topic}/schema`,
    { type: 'JSON', schema: JSON.stringify(schema), properties: {} }, { timeout: 10000 });


console.log('Attempting to create schema');
createSchema({ tenant: 'public', namespace: 'default', topic: MEASUREMENTS_TOPIC, schema: measurementSchema })
  .then(() => console.log('Done'))
  .catch(console.error);




