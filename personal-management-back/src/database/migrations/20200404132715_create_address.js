
exports.up = function(knex) {
    return knex.schema.createTable('address', function(table){
        table.increments('addressId').primary();
        table.string('publicPlace').notNullable();
        table.integer('streetNumber').notNullable();
        table.string('streetAddOn').nullable();
        table.string('neighborhood').nullable();
        table.string('postalCode').notNullable();
        table.string('countryAcronym', 3).nullable();
        table.string('country').notNullable();
        table.string('stateAcronym', 3).nullable();
        table.string('state').notNullable();
        table.string('city').notNullable();
        table.enu('typeAddress', ['RESIDENCIAL','COMERCIAL']);


        table.integer('peopleId').notNullable();

        table.foreign('peopleId').references('peopleId').inTable('people');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('contacts');
};
