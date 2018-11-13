const pg = require("pg");// require postgreSQL
const argv = require("argv");// require process.agrv
const settings = require("./settings");// settings.json
const moment = require("moment");

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

const command = process.argv[2];
//command is the argument in the command line immediately after `node test_script.js`

function searchByFirstName(db) {
    const query = {
        text: 'SELECT * FROM famous_people WHERE first_name = $1::text',
        values: [command]
        }
    console.log("Searching...");
    // console.log('Search query: ', query);
    db.query(query, (err, result) => {
        if (err) {
            return console.error("Connection err in searchByFirstName: ", err);
        }
        // console.log(result.rows.length);
        console.log(`Found ${result.rows.length} person(s) by the name '${command}'.`)
        result.rows.forEach(function(row, index) {
            console.log(` - ${index + 1} : ${row.first_name} ${row.last_name}, born \'${moment(row.birthdate).format('YYYY-MM-DD')}\'`);
        });
        db.end();
    });
}

client.connect((err) => {
    if (err) {
        return console.error("Connection Error", err);
    }
    searchByFirstName(client);
});