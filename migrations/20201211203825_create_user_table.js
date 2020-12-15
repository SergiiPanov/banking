exports.up = function (knex) {
    return knex.schema.createTable("user", table => {
        table.increments();

        table.string("first_name");
        table.string("last_name");
        table.string("password");
        table.string("day_of_birthday");
        table.string("age");


        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.string("created_by");

        table.timestamp("updated_at");
        table.string("updated_by");

        table.boolean("is_active").notNullable().defaultTo(true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("user");
};