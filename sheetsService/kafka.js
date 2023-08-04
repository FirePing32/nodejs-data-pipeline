// Import kafka
const {Kafka} = require('kafkajs');

const kafka = new Kafka({
    clientId: "forms",
    brokers: ["kafka-1:9092", "kafka-2:9092", "kafka-3:9092"],
});

const topicName = "sheetExport";

const sheetsConsumer = kafka.consumer({groupId: "sheets"});
sheetsConsumer.connect();
sheetsConsumer.subscribe({topic: topicName});

module.exports = sheetsConsumer;