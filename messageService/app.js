const express = require('express');
const app = express();
const cors = require('cors');

const sendMessage = require('./message.js');
const messageConsumer = require('./kafka.js');

// Listening for kafka stream message
messageConsumer.run({
  eachMessage: async({ topic, partition, message}) => {
    await sendMessage(message.value.toJSON);
  }
});

app.use(cors(), express.json());

app.set('trust proxy', 1);

app.get('/message', (req, res) => {
  res.json({"Msg":"Message API"})
})

module.exports = {app}
