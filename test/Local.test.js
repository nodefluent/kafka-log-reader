"use strict";

const KafkaLogReader = require("./../index.js");

const kafkaLogReader = new KafkaLogReader({
    serverProperties: "/usr/local/etc/kafka/server.properties"
});

(async () => {
    await kafkaLogReader.init();
    await kafkaLogReader.heatCheck();
})().catch(console.error);