const sendGrid = require('@sendgrid/mail');
const env = require('../env');

class Sender {
    constructor() {
        sendGrid.setApiKey(env.GLS_MAIL_API_KEY);
        sendGrid.setSubstitutionWrappers('{{', '}}');
    }

    async send({ from, to, subject, templateId, data }) {
        try {
            await sendGrid.send({
                from,
                to,
                subject,
                templateId,
                dynamicTemplateData: data,
            });
        } catch (error) {
            if (error.response) {
                throw { code: 1001, message: 'Invalid SendGrid request' };
            } else {
                throw error;
            }
        }
    }

    async sendBulk({ messages }) {
        for (let message of messages) {
            await this.send(message);
        }
    }
}

module.exports = Sender;
