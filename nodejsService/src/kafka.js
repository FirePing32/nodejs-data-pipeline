// Improrting Kafka
const { Kafka, Partitioners } = require('kafkajs');

const kafka = new Kafka({
    clientId: "forms",
    brokers: ["kafka-1:9092", "kafka-2:9092", "kafka-3:9092"],
});

const topicName = 'responseSubmitted';

// Creating kafka producer that will produce event messages on form response submission
const producer = kafka.producer({createPartitioner: Partitioners.LegacyPartitioner});
producer.connect();

module.exports = producer;