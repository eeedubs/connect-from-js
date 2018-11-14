const pg = require("pg");// require postgreSQL
const argv = require("argv");// require process.agrv
const settings = require("./settings");// settings.json

const config = {
    user    : settings.user,
    password: settings.password,
    database: settings.database,
    host    : settings.hostname,
    port    : settings.port,
    ssl     : settings.ssl
};
//config is a key of the various login requirements to access the database

const client = new pg.Client(config);
//client is the database

const command = process.agrv[2];

function createPerson(db, firstName, lastName, birthDate) {
    // console.log('!!!! lastname: ', lastName);
    const query = `INSERT INTO
                    "famous_people" (first_name, last_name, birthDate)
                    VALUES ($1::text, $2::text, $3::date);
                    `
    console.log('Insert query: ', query);
    db.query(query, [firstName, lastName, birthDate], (err, result) => {
        if (err) {
            return console.error("Connection err in createPerson: ", err);
        }
        console.log('createPerson res: ', result);
        db.end();
    });
}

client.connect((err) => {
    console.log('command: ', command);
    if (command === 'C') {
        createPerson(client, process.agrv[3], process.argv[4], process.agrv[5]);
    } else {
        throw err;
    }
});