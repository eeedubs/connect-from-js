
exports.up = function(knex, Promise) {
    return knex.schema.table('milestones', function (table) {
        table.integer('famous_person_id');
        table.foreign('famous_person_id').references('famous_people');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropColumn('famous_person_id');
};
