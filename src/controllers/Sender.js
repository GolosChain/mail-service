const sendGrid = require('@sendgrid/mail');
const env = require('../env');

class Sender {
    constructor() {
        sendGrid.setApiKey(env.GLS_MAIL_API_KEY);
        sendGrid.setSubstitutionWrappers('{{', '}}');
    }

    async send({ from, to, subject, templateId, data }) {
        await sendGrid.send({
            from,
            to,
            subject,
            templateId,
            dynamicTemplateData: data,
        });
    }

    async sendBulk({ messages }) {
        for (let message of messages) {
            await this.send(message);
        }
    }
}

module.exports = Sender;
