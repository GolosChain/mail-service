const core = require('gls-core-service');
const stats = core.Stats.client;
const logger = core.Logger;
const errors = core.HttpError;
const Subscribe = require('../../model/Subscribe');

class Options {
    async get({ user }) {
        const time = new Date();
        const model = await this._findOrCreateSubscribe(user);

        stats.timing('get_options', time - new Date());

        // TODO -
    }

    async set({ user, data }) {
        const time = new Date();

        try {
            const model = await this._findOrCreateSubscribe(user);

            // TODO -

            await model.save();

            stats.timing('set_options', new Date() - time);
        } catch (error) {
            logger.error(error);
            stats.increment('options_invalid_request');
            throw errors.E400.error;
        }
    }

    async _findOrCreateSubscribe(user) {
        let model = await Subscribe.findOne({ user });

        if (!model) {
            model = await new Subscribe({ user });

            await model.save();
        }

        return model;
    }
}

module.exports = Options;
