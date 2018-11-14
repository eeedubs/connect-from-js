const settings = require('./settings');
const argv = require('argv');

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

// const command = process.argv[2];
const first = process.argv[2];
const last = process.argv[3];

knex.select().from('famous_people')
.where('first_name', `${first}`)
.andWhere('last_name', `${last}`)
.del()
.asCallback(function(err, result){
    console.log("Deleting...");
    if (err) {
        throw err;
    }
    console.log(`Deleted ${first} ${last} from famous_people.`);
    knex.destroy();
});