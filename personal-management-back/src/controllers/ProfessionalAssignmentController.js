const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const experience = request.params;
        const experienceId = Number.parseInt(experience.experience);
        const assignments = await connection('professional_assignments')
            .where('experienceId', experienceId)
            .select('*');

        return response.json({ assignments });
    },

    async create(request, response) {
        const { assignment } = request.body;
        const experience = request.params;
        const experienceId = Number.parseInt(experience.experience);

        const assignmentId = await connection('professional_assignments').insert({
            assignment,
            experienceId
        });

        return response.json({ assignmentId });
    },

    async update(request, response) {
        const { assignment } = request.body;
        const { experienceId, assignmentId } = request.params;

        const assignmentReturn = await connection('professional_assignments')
            .where('assignmentId', assignmentId)
            .select('experienceId')
            .first();
        
        if (assignmentReturn.experienceId != experienceId) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('professional_assignments')
            .where('assignmentId', assignmentId)
            .update({ assignment });
        
        return response.status(204).send();
    },

    async delete(request, response) {
        const { experienceId, assignmentId } = request.params;
        

        const assignment = await connection('professional_assignments')
            .where('assignmentId', assignmentId)
            .select('experienceId')
            .first();

        if (assignment.experienceId != experienceId) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('professional_assignments').where('assignmentId', assignmentId).delete();

        return response.status(204).send();
    }
};