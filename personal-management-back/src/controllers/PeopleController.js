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
    }
};