
exports.up = function(knex) {
    return knex.schema.createTable('knowledge', function(table){
        table.increments('knowledgeId').primary();
        table.string('nameKnowledge').notNullable();
        table.enu('typeKnowledge', ['ACADEMICO','PROFISSIONAL']);
        table.enu('knowledgeLevel',['BASICO','INTERMEDIÁRIO','AVANÇADO']);
        table.string('note');
        table.integer('peopleId').notNullable();

        table.foreign('peopleId').references('peopleId').inTable('people');
    });  
};

exports.down = function(knex) {
    return knex.schema.dropTable('knowledge');
};
