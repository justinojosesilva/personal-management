
exports.up = function(knex) {
  return knex.schema.createTable('people', function(table) {
      table.increments('peopleId').primary();
      table.string('name', 20).notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.integer('age').nullable();
      table.date('birthDate');
      table.enu('maritalStatus', ['CASADO(A)','SOLTEIRO(A)','DIVORCIADO(A)','VIÚVO(A)']);
      table.enu('gender', ['MASCULINO','FEMININO']);
      table.decimal('pretentionValueCLT');
      table.decimal('pretentionValuePJ');
      table.boolean('negotiableFlag');
      table.string('birthState', 2);
      table.string('hometown')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('people');
};
