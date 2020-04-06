
exports.up = function(knex) {
    return knex.schema.createTable('course', function(table){
        table.increments('courseId').primary();
        table.string('nameCourse').notNullable();
        table.string('institution').notNullable();
        table.enu('typeCourse',['PRESENCIAL','ONLINE']);
        table.integer('durationCourse');
        table.date('initialDate').nullable();
        table.date('finalDate').nullable();
        table.boolean('completedFlag').notNullable();
        table.integer('peopleId').notNullable();

        table.foreign('peopleId').references('peopleId').inTable('people');
    });   
};

exports.down = function(knex) {
    return knex.schema.dropTable('course');
};
