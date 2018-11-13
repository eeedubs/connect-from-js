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

function listPeople(db) {
    db.query('SELECT * FROM famous_people;', (err, result) => {
        if (err) {
            return console.error("Connection err in listPeople: ", err);
        }
        console.log('res', result.rows);
        db.end();
    });
}

client.connect((err) => {
    if (err) {
        return console.error("Connection Error", err);
    }
    listPeople(client);
});