const core = require('gls-core-service');
const BasicService = core.service.Basic;
const Gate = core.service.Gate;
const Sender = require('./handler/Sender');
const Options = require('./handler/Options');

class Router extends BasicService {
    constructor() {
        super();

        this._gate = new Gate();
        this._sender = new Sender();
        this._options = new Options();
    }

    async start() {
        await this._gate.start({
            serverRoutes: {
                transfer: this._sender.broadcast.bind(this._sender),
                getOptions: this._options.get.bind(this._options),
                setOptions: this._options.set.bind(this._options),
            },
        });

        this.addNested(this._gate);
    }

    async stop() {
        await this.stopNested();
    }
}

module.exports = Router;
