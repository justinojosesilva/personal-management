
exports.up = function(knex) {
  return knex.schema.createTable('contacts', function(table){
    table.increments('contactId').primary();
    table.enu('typeContact', ['CELULAR','RESIDENCIAL','COMERCIAL']).notNullable();
    table.string('phoneNumber').notNullable();

    table.integer('peopleId').notNullable();

    table.foreign('peopleId').references('peopleId').inTable('people');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('contacts');
};
