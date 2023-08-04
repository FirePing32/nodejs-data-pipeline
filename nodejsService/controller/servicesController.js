const producer = require("../kafka")

const sheetExport = async (req, res) => {
    var response = await Response.find({ formId: req.body.formId });

    if (response == null || response == undefined) {
        return res.status(404).json({ error: "Response does not exist." });
    }

    try {
        await producer.send({
            topic: "sheetExport",
            messages: [{ value: response }],
        });
    } catch (e) {
        res.status(400);
        return res.json({ error: e.message });
    }
    res.status(200);
    return res.json({ status: "accepted by consumer" });
};

const sendMessage = async (req, res) => {
    var response = await Response.find({ formId: req.body.formId });

    if (response == null || response == undefined) {
        return res.status(404).json({ error: "Response does not exist." });
    }

    let message = req.body.message
    let numbers = req.body.numbers

    try {
        await producer.send({
            topic: "sendMessage",
            messages: [{ value: {message: message, numbers: numbers} }],
        });
    } catch (e) {
        res.status(400);
        return res.json({ error: e.message });
    }
    res.status(200);
    return res.json({ status: "accepted by consumer" });
}

module.exports = { sheetExport, sendMessage }