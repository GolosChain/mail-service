const core = require('gls-core-service');
const BasicConnector = core.services.Connector;
const Sender = require('../controllers/Sender');

class Connector extends BasicConnector {
    constructor() {
        super();

        this._sender = new Sender();
    }

    async start() {
        await super.start({
            serverRoutes: {
                sendOne: this._sender.sendOne.bind(this._sender),
                sendMany: this._sender.sendMany.bind(this._sender),
            },
        });
    }
}

module.exports = Connector;
