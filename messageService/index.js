const app = require("./app").app;
const PORT = 9002;

app.listen(PORT, () => {
    console.log(`🚀 Server ready at port ${PORT}!`);
})