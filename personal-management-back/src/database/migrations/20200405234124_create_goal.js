
exports.up = function(knex) {
    return knex.schema.createTable('goal', function(table){
        table.increments('goalId').primary();
        table.string('objectiveDescription').notNullable();
        table.enu('typeObjective', ['ACADEMICO','PROFISSIONAL']).notNullable();
        table.integer('peopleId').notNullable();

        table.foreign('peopleId').references('peopleId').inTable('people');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('goal');
};
