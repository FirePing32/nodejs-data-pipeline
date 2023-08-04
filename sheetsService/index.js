const app = require("./app").app;
const PORT = 9001;

const consumer = require('./kafka.js');

app.listen(PORT, () => {
    console.log(`🚀 Server ready at port ${PORT}!`);
})