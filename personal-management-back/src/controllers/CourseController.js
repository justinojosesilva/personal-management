const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const course = await connection('course').select('*');

        return response.json(course);
    },

    async create(request, response) {
        const { 
            nameCourse,
            institution, 
            typeCourse, 
            durationCourse, 
            initialDate, 
            finalDate, 
            completedFlag 
        } = request.body;
        const peopleId = request.headers.authorization;

        const courseId = await connection('course').insert({
            nameCourse,
            institution, 
            typeCourse, 
            durationCourse, 
            initialDate, 
            finalDate, 
            completedFlag,
            peopleId,
        });

        return response.json({ courseId });
    },

    async update(request, response) {
        const { 
            nameCourse,
            institution, 
            typeCourse, 
            durationCourse, 
            initialDate, 
            finalDate, 
            completedFlag 
         } = request.body;

        const { courseId } = request.params;
        const peopleId = request.headers.authorization;

        const course = await connection('course')
            .where('courseId', courseId)
            .select('peopleId')
            .first();

        if (course.peopleId != peopleId) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('course').where('courseId', courseId).update({ 
            nameCourse,
            institution, 
            typeCourse, 
            durationCourse, 
            initialDate, 
            finalDate, 
            completedFlag 
         });

        return response.status(204).send();
    },

    async delete(request, response) {
        const { courseId } = request.params;
        const peopleId = request.headers.authorization;        

        const course = await connection('course')
            .where('courseId', courseId)
            .select('peopleId')
            .first();

        if (course.peopleId != peopleId) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('course').where('courseId', courseId).delete();

        return response.status(204).send();
    }
};