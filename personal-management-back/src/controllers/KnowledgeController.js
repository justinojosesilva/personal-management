const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const knowledge = await connection('knowledge').select('*');

        return response.json(knowledge);
    },

    async create(request, response) {
        const { 
            nameKnowledge,
            typeKnowledge, 
            knowledgeLevel, 
            note
        } = request.body;
        const peopleId = request.headers.authorization;

        const knowledgeId = await connection('knowledge').insert({
            nameKnowledge,
            typeKnowledge, 
            knowledgeLevel, 
            note,
            peopleId,
        });

        return response.json({ knowledgeId });
    },

    async update(request, response) {
        const { 
            nameKnowledge,
            typeKnowledge, 
            knowledgeLevel, 
            note 
         } = request.body;

        const { knowledgeId } = request.params;
        const peopleId = request.headers.authorization;

        const knowledge = await connection('knowledge')
            .where('knowledgeId', knowledgeId)
            .select('peopleId')
            .first();

        if (knowledge.peopleId != peopleId) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('knowledge').where('knowledgeId', knowledgeId).update({ 
            nameKnowledge,
            typeKnowledge, 
            knowledgeLevel, 
            note 
         });

        return response.status(204).send();
    },

    async delete(request, response) {
        const { knowledgeId } = request.params;
        const peopleId = request.headers.authorization;        

        const knowledge = await connection('knowledge')
            .where('knowledgeId', knowledgeId)
            .select('peopleId')
            .first();

        if (knowledge.peopleId != peopleId) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('knowledge').where('knowledgeId', knowledgeId).delete();

        return response.status(204).send();
    }
};