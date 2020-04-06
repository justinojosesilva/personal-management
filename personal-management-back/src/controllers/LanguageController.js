const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const language = await connection('language').select('*');

        return response.json(language);
    },

    async create(request, response) {
        const { nameLanguage, languageLevel, noteLanguage } = request.body;
        const peopleId = request.headers.authorization;

        const languageId = await connection('language').insert({
            nameLanguage,
            languageLevel,
            noteLanguage, 
            peopleId,
        });

        return response.json({ languageId });
    },

    async update(request, response) {
        const { nameLanguage, languageLevel, noteLanguage } = request.body;
        const { languageId } = request.params;
        const peopleId = request.headers.authorization;

        const language = await connection('language')
            .where('languageId', languageId)
            .select('peopleId')
            .first();

        if (language.peopleId != peopleId) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('language').where('languageId', languageId).update({ nameLanguage, languageLevel, noteLanguage });

        return response.status(204).send();
    },

    async delete(request, response) {
        const { languageId } = request.params;
        const peopleId = request.headers.authorization;        

        const language = await connection('language')
            .where('languageId', languageId)
            .select('peopleId')
            .first();

        if (language.peopleId != peopleId) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('language').where('languageId', languageId).delete();

        return response.status(204).send();
    }
};