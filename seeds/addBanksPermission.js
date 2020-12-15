
exports.seed = async function(knex) {
    await knex('banks_permission').del()
    await knex('banks_permission').insert([
        {id: 1, bank_name: 'alfa', first_name : true, last_name: true, day_of_birthday: false, age: false},
        {id: 2, bank_name: 'privat', first_name : true, last_name: true, day_of_birthday: true, age: false},
        {id: 3, bank_name: 'pumb', first_name : true, last_name: true, day_of_birthday: false, age: true},
        {id: 4, bank_name: 'oshad', first_name : true, last_name: true, day_of_birthday: true, age: true},
        {id: 5, bank_name: 'monobank', first_name : false, last_name: false, day_of_birthday: false, age: true},
      ]);
};
