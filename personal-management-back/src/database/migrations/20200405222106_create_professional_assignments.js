
exports.up = function(knex) {
    return knex.schema.createTable('professional_assignments', function(table) {
        table.increments('assignmentId').primary();
        table.string('assignment').notNullable();
        table.integer('experienceId').notNullable();

        table.foreign('experienceId').references('experienceId').inTable('professional_experience');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('professional_assignments'); 
};
