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

const first = process.argv[2];
const last = process.argv[3];
const birth = process.argv[4];

knex('famous_people')
.insert({first_name: first,
        last_name: last,
        birthdate: birth
        })
.asCallback(function(err, result){
    console.log("Inserting...");
    if (err) {
        throw err;
    }
    console.log(`Inserted ${first} ${last} to famous_people.`);
    knex.destroy();
});