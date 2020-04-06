const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const goals = await connection('goal').select('*');

        return response.json(goals);
    },

    async create(request, response) {
        const { objectiveDescription, typeObjective } = request.body;
        const peopleId = request.headers.authorization;

        const goalId = await connection('goal').insert({
            objectiveDescription,
            typeObjective, 
            peopleId,
        });

        return response.json({ goalId });
    },

    async update(request, response) {
        const { objectiveDescription, typeObjective} = request.body;
        const { goalId } = request.params;
        const peopleId = request.headers.authorization;

        const goal = await connection('goal')
            .where('goalId', goalId)
            .select('peopleId')
            .first();

        if (goal.peopleId != peopleId) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('goal').where('goalId', goalId).update({objectiveDescription, typeObjective});

        return response.status(204).send();
    },

    async delete(request, response) {
        const { goalId } = request.params;
        const peopleId = request.headers.authorization;        

        const goal = await connection('goal')
            .where('goalId', goalId)
            .select('peopleId')
            .first();

        if (goal.peopleId != peopleId) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('goal').where('goalId', goalId).delete();

        return response.status(204).send();
    }
};