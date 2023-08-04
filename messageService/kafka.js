const {Kafka} = require('kafkajs');

const kafka = new Kafka({
    clientId: "forms",
    brokers: ["kafka-1:9092", "kafka-2:9092", "kafka-3:9092"],
});

const topicName = 'sendMessage';

const messageConsumer = kafka.consumer({groupId: "message"});
messageConsumer.connect();
messageConsumer.subscribe({topic: topicName});

module.exports = messageConsumer;