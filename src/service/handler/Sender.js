const sendGrid = require('@sendgrid/mail');
const env = require('../../Env');

class Sender {
    constructor() {
        sendGrid.setApiKey(env.GLS_MAIL_API_KEY);
        sendGrid.setSubstitutionWrappers('{{', '}}');
    }

    async broadcast(data) {
        if (!Array.isArray(data)) {
            data = [data];
        }

        for (let message of data) {
            await this._send(message);
        }
    }

    async _send({ from, to, subject, templateId, data }) {
        await sendGrid.send({
            from,
            to,
            subject,
            templateId,
            dynamicTemplateData: data,
        });
    }
}

module.exports = Sender;
