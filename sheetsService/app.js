const express = require('express');
const app = express();
const cors = require('cors');
const uploadResponse = require('./sheets.js');
const sheetsConsumer = require('./kafka.js');

// checking for stream messages
sheetsConsumer.run({
  eachMessage: async({ topic, partition, message}) => {
    uploadResponse(message.value.toString())
  }
})

app.use(cors(), express.json());

// Allow to run behind proxy(Nginx)
app.set('trust proxy', 1);

app.get('/sheetsapi', (req, res) => {
  res.json({"Service":"Sheets API"})
})

module.exports = {app}
