const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const experience = await connection('professional_experience').select('*');

        return response.json({ experience });
    },

    async create(request, response) {
        const {
            companyName,
            companyCNPJ,
            companyType,
            companyNationality,
            initialDate,
            finalDate,
            currentExperience
        } = request.body;
        const peopleId = request.headers.authorization;

        const experienceId = await connection('professional_experience').insert({
            companyName,
            companyCNPJ,
            companyType,
            companyNationality,
            initialDate,
            finalDate,
            currentExperience,
            peopleId
        });

        return response.json({ experienceId });
    },

    async update(request, response) {
        const {             
            companyName,
            companyCNPJ,
            companyType,
            companyNationality,
            initialDate,
            finalDate,
            currentExperience 
        } = request.body;
        const { experienceId } = request.params;
        const peopleId = request.headers.authorization;

        const experience = await connection('professional_experience')
            .where('experienceId', experienceId)
            .select('peopleId')
            .first();
        
        if (experience.peopleId != peopleId) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('professional_experience')
            .where('experienceId', experienceId)
            .update({
                companyName,
                companyCNPJ,
                companyType,
                companyNationality,
                initialDate,
                finalDate,
                currentExperience 
            });
        
        return response.status(204).send();
    },

    async delete(request, response) {
        const { experienceId } = request.params;
        const peopleId = request.headers.authorization;
        

        const experience = await connection('professional_experience')
            .where('experienceId', experienceId)
            .select('peopleId')
            .first();

        if (experience.peopleId != peopleId) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('professional_experience').where('experienceId', experienceId).delete();

        return response.status(204).send();
    }
};