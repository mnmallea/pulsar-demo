const avro = require('avro-js');

exports.schema = {
  name: 'Measurement',
  type: 'record',
  fields: [
    { name: 'id', type: 'string'},
    { name: 'temperature', type: 'int'},
    { name: 'timestamp', type: 'string'}
  ]
};

exports.type = avro.parse(exports.schema);
