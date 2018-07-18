"use strict";

const Promise = require("bluebird");
const debug = require("debug")("klr:main");
const readProperties = require("properties-reader");

const fs = Promise.promisifyAll(require("fs"));
const path = require("path");

class KafkaLogReader {

    constructor(config = {}){
        this.config = config;
        this.serverProperties = null;
        this.logDir = null;
    }

    getProperty(name){
        return this.serverProperties.get(name);
    }

    async init(){
        debug("Reading server properties", this.config.serverProperties);
        //TODO: await readProperties
        this.serverProperties = readProperties(this.config.serverProperties);
        this.logDir = this.getProperty("log.dirs");
        debug("Identified server log dir", this.logDir);
    }

    async heatCheck(){

        // PoC plan:
        // read and parse server.properties
        // parse topic and partitions from folder names
        // create memory map of index files
        // read message via memory map index

        const tpIndexFile = path.join(this.logDir, "test-topic-0/00000000000000031482.index");
        //const tpLogFile = path.join(this.logDir, "test-topic-0/00000000000000031482.log");

        const tpIndexData = await fs.readFileAsync(tpIndexFile);
        debug(tpIndexData);
        debug(tpIndexData.length);
    }
}

module.exports = KafkaLogReader;