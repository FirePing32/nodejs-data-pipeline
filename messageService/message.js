const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

async function sendMessage(response) {
    try {
        client.messages
            .create({
                body: response.message,
                from: "+919745623465",
                to: response.phone,
            })
            .then((message) => console.log(message.sid));
    } catch (err) {
        res.send("Failed to send SMS to the Client");
    }
}

module.exports = sendMessage;
