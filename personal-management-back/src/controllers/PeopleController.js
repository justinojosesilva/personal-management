const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const people = await connection('people').select('*');
    
        return response.json(people);
    },

    async create(request, response) {
        const { 
            name,
            email,
            password,
            age,
            birthDate,
            maritalStatus,
            gender,
            pretentionValueCLT,
            pretentionValuePJ,
            negotiableFlag,
            birthState,
            hometown
        } = request.body;
    
        const [peopleId] = await connection('people').insert({
            name,
            email,
            password,
            age,
            birthDate,
            maritalStatus,
            gender,
            pretentionValueCLT,
            pretentionValuePJ,
            negotiableFlag,
            birthState,
            hometown,
        });
    
    
        return response.json({ peopleId });
    },

    async update(request, response) {
        const { 
            name,
            email,
            password,
            age,
            birthDate,
            maritalStatus,
            gender,
            pretentionValueCLT,
            pretentionValuePJ,
            negotiableFlag,
            birthState,
            hometown
        } = request.body;
        const {peopleParamsId} = request.params;
        const peopleId = request.headers.authorization;

        const people = await connection('people')
            .where('peopleId', peopleParamsId)
            .select('peopleId')
            .first();

        if (people.peopleId != peopleId) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('people')
            .where('peopleId', peopleParamsId)
            .update({
                name,
                email,
                password,
                age,
                birthDate,
                maritalStatus,
                gender,
                pretentionValueCLT,
                pretentionValuePJ,
                negotiableFlag,
                birthState,
                hometown
            });

        return response.status(204).send();
    },

    async delete(request, response) {
        const {peopleParamsId} = request.params;
        const peopleId = request.headers.authorization;

        const people = await connection('people')
            .where('peopleId', peopleParamsId)
            .select('peopleId')
            .first();

        if (people.peopleId != peopleId) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('people').where('peopleId', peopleParamsId).delete();

        return response.status(204).send();
    }
};