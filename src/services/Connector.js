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
                send: this._sender.send.bind(this._sender),
                sendBulk: this._sender.sendBulk.bind(this._sender),
            },
        });
    }
}

module.exports = Connector;
