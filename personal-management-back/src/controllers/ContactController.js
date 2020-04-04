const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const contacts = await connection('contacts').select('*');

        return response.json(contacts);
    },

    async create(request, response) {
        const { typeContact, phoneNumber} = request.body;
        const peopleId = request.headers.authorization;

        const contactId = await connection('contacts').insert({
            typeContact,
            phoneNumber,
            peopleId,
        });

        return response.json({ contactId });
    },

    async update(request, response) {
        const { typeContact, phoneNumber} = request.body;
        const {contactId} = request.params;
        const peopleId = request.headers.authorization;

        const contact = await connection('contacts')
            .where('contactId', contactId)
            .select('peopleId')
            .first();

        if (contact.peopleId != peopleId) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('contacts').where('contactId', contactId).update({typeContact, phoneNumber});

        return response.status(204).send();
    },

    async delete(request, response) {
        const { contactId } = request.params;
        const peopleId = request.headers.authorization;
        

        const contact = await connection('contacts')
            .where('contactId', contactId)
            .select('peopleId')
            .first();

        if (contact.peopleId != peopleId) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('contacts').where('contactId', contactId).delete();

        return response.status(204).send();
    }
};