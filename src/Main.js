const core = require('gls-core-service');
const stats = core.statsClient;
const BasicMain = core.services.BasicMain;
const MongoDB = core.service.MongoDB;
const env = require('./env');
const Connector = require('./services/Connector');

class Main extends BasicMain {
    constructor() {
        super(stats, env);
        this.addNested(new MongoDB(), new Connector());
    }
}

module.exports = Main;
