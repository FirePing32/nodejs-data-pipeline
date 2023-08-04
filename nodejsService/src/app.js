const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors(), express.json());

// Allow to run behind proxy(Nginx)
app.set('trust proxy', 1);

// Routes
app.get('/api', (req, res) => {
  console.log("Home Page")
  res.json({"Msg":"Home Page"})
});

// Form Routes
const formRouter = require('./routes/formRouter.js');
app.use('/api/form/', formRouter);

module.exports = {app};

