const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const address = await connection('address').select('*');

        return response.json({ address });
    },

    async create(request, response) {
        const {
            publicPlace,
            streetNumber,
            streetAddOn,
            neighborhood,
            postalCode,
            countryAcronym,
            country,
            stateAcronym,
            state,
            city,
            typeAddress
        } = request.body;
        const peopleId = request.headers.authorization;

        const addressId = await connection('address').insert({
            publicPlace,
            streetNumber,
            streetAddOn,
            neighborhood,
            postalCode,
            countryAcronym,
            country,
            stateAcronym,
            state,
            city,
            typeAddress,
            peopleId
        });

        return response.json({ addressId });
    },

    async update(request, response) {
        const { publicPlace,
            streetNumber,
            streetAddOn,
            neighborhood,
            postalCode,
            countryAcronym,
            country,
            stateAcronym,
            state,
            city,
            typeAddress } = request.body;
        const { addressId } = request.params;
        const peopleId = request.headers.authorization;

        const address = await connection('address')
            .where('addressId', addressId)
            .select('peopleId')
            .first();
        
        if (address.peopleId != peopleId) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('address')
            .where('addressId', addressId)
            .update({
                publicPlace,
                streetNumber,
                streetAddOn,
                neighborhood,
                postalCode,
                countryAcronym,
                country,
                stateAcronym,
                state,
                city,
                typeAddress
            });
        
        return response.status(204).send();
    },

    async delete(request, response) {
        const { addressId } = request.params;
        const peopleId = request.headers.authorization;
        

        const address = await connection('address')
            .where('addressId', addressId)
            .select('peopleId')
            .first();

        if (address.peopleId != peopleId) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('address').where('addressId', addressId).delete();

        return response.status(204).send();
    }
};