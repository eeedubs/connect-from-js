const settings = require('./settings');
const argv = require('argv');
const moment = require("moment");

const config = {
    user    : settings.user,
    password: settings.password,
    database: settings.database,
    host    : settings.hostname,
    port    : settings.port,
    ssl     : settings.ssl
};

const knex = require('knex')({
    client: 'pg',
    connection: config
});

const command = process.argv[2];

knex.select().from('famous_people')
.where('first_name', 'LIKE', `%${command}%`)
.orWhere('last_name', 'LIKE', `%${command}%`) 
.asCallback(function(err, result){
    console.log("Searching...");
    if (err) {
        throw err;
    }
    console.log(`Found ${result.length} person(s) by the name '${command}':`);
    result.forEach(function(row, index) {
        console.log(` - ${index + 1}: ${row.first_name} ${row.last_name}, born \'${moment(row.birthdate).format('YYYY-MM-DD')}\'`);
    });
    knex.destroy();
});
