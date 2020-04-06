
exports.up = function(knex) {
    return knex.schema.createTable('technology', function(table) {
        table.increments('technologyId').primary();
        table.string('technology').notNullable();
        table.enu('technologyLevel', ['BASICO','INTERMEDIÁRIO','AVANÇADO'])
        table.string('note');
        table.integer('knowledgeId').notNullable();

        table.foreign('knowledgeId').references('knowledgeId').inTable('knowledge');
    });  
};

exports.down = function(knex) {
    return knex.schema.dropTable('technology');
};
