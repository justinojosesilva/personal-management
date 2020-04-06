
exports.up = function(knex) {
    return knex.schema.createTable('professional_experience', function(table) {
      table.increments('experienceId').primary();
      table.string('companyName').notNullable();
      table.string('companyCNPJ');
      table.enu('companyType',['EDUCACIONAL','COMERCIAL']);
      table.string('companyNationality');
      table.date('initialDate').nullable();
      table.date('finalDate').nullable();
      table.boolean('currentExperience').notNullable();

      table.integer('peopleId').notNullable();

      table.foreign('peopleId').references('peopleId').inTable('people');
    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('professional_experience');  
  };
