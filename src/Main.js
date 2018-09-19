const core = require('gls-core-service');
const stats = core.statsClient;
const BasicMain = core.services.BasicMain;
const MongoDB = core.service.MongoDB;
const env = require('./Env');
const Connector = require('./services/Connector');

class Main extends BasicMain {
    constructor() {
        super(stats);

        this.printEnvBasedConfig(env);
        this.addNested(new MongoDB(), new Connector());
    }
}

module.exports = Main;
