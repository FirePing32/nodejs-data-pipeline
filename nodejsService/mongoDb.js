var mongoose = require('mongoose');

// Connecting to MongoDB through K8s svc
var mongoDB = `mongodb://mongodb-svc/form?authSource=admin`;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error',console.error.bind(console, 'MongoDB connection error:'));