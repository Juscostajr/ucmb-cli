var mysqli      = require('mysql');
var connection = mysqli.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'bpm_act'
});
module.exports = connection;