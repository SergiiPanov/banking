exports.up = function (knex) {
    return knex.schema.createTable("banks_permission", table => {
        table.increments();

        table.string("bank_name").notNullable();
        table.boolean("first_name").defaultTo(false);
        table.boolean("last_name").defaultTo(false);
        table.boolean("password").defaultTo(false);
        table.boolean("day_of_birthday").defaultTo(false);
        table.boolean("age").defaultTo(false);


        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.string("created_by");

        table.timestamp("updated_at");
        table.string("updated_by");

        table.boolean("is_active").notNullable().defaultTo(true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("banks_permission");
};