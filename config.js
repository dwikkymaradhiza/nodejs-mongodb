const nconf = require('nconf');
const path = require('path');

nconf
  .argv()
  .env([
    'PORT'
  ])
  .file({ file: path.join(__dirname, 'config.json') })
  .defaults({
    PORT: 3000,
  });

module.exports = nconf;
