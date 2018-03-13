
exports.up = function(knex, Promise) {
  return knex.schema.createTable(`spaces`, (table) => {
    table.increments();
    table.decimal(`longitude`, 9, 6).notNullable();
    table.decimal(`latitude`, 9, 6).notNullable();
    table.string(`description`);
    table.string(`image_url`);
    table.integer(`user_id`).references(`id`).inTable(`users`);
    table.integer(`address_id`).references(`id`).inTable(`addresses`);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(`spaces`);
};
