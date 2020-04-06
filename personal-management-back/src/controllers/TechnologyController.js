const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const knowledge = request.params;
        const knowledgeId = Number.parseInt(knowledge.knowledge);
        const technology = await connection('technology')
            .where('knowledgeId', knowledgeId)
            .select('*');

        return response.json({ technology });
    },

    async create(request, response) {
        const { technology, technologyLevel, note } = request.body;
        const knowledge = request.params;
        const knowledgeId = Number.parseInt(knowledge.knowledge);

        const technologyId = await connection('technology').insert({ technology, technologyLevel, note, knowledgeId });

        return response.json({ technologyId });
    },

    async update(request, response) {
        const { technology, technologyLevel, note } = request.body;
        const { knowledgeId, technologyId } = request.params;

        const technologyReturn = await connection('technology')
            .where('technologyId', technologyId)
            .select('knowledgeId')
            .first();
        
        if (technologyReturn.knowledgeId != knowledgeId) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('technology').where('technologyId', technologyId).update({ technology, technologyLevel, note });
        
        return response.status(204).send();
    },

    async delete(request, response) {
        const { knowledgeId, technologyId } = request.params;
        
        const technology = await connection('technology')
            .where('technologyId', technologyId)
            .select('knowledgeId')
            .first();

        if (technology.knowledgeId != knowledgeId) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('technology').where('technologyId', technologyId).delete();

        return response.status(204).send();
    }
};