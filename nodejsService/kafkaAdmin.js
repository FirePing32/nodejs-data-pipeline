// Import kafka
const {Kafka} = require('kafkajs');

const kafka = new Kafka({
    clientId: "forms",
    brokers: ["kafka-1:9092", "kafka-2:9092", "kafka-3:9092"],
});

const topicName = ["sheetExport", "sendMessage"];

// Creating Topics
topicName.forEach(async (topic) => {
  const admin = kafka.admin();
  await admin.connect();
  await admin.createTopics({
      topics: [{ topic: topicName, numPartitions: 1, replicationFactor: 3 }],
  });

  await admin.disconnect();
})

process().then(() => console.log('Topics created'));

