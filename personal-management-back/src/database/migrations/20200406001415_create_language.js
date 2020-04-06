
exports.up = function(knex) {
    return knex.schema.createTable('language', function(table){
        table.increments('languageId').primary();
        table.string('nameLanguage').notNullable();
        table.enu('languageLevel', ['BASICO','INTERMEDIÁRIO','AVANÇADO']).notNullable();
        table.string('noteLanguage').nullable();
        table.integer('peopleId').notNullable();

        table.foreign('peopleId').references('peopleId').inTable('people');
    }); 
};

exports.down = function(knex) {
    return knex.schema.dropTable('language');
};
