// Update with your config settings.
var settings = require('./settings');

module.exports = {
  development: {
    client: 'pg',
    connection: settings
  }
}
