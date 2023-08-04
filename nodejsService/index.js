const app = require("./app").app;
const PORT = process.env.port || 8000;

app.listen(PORT, () => {
    console.log(`Server ready at port ${PORT}!`);
})