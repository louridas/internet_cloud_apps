const mysql = require('mysql');
const fs = require('fs');

const configPath = './db_config.json';
const dbConfig = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));

const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : dbConfig.host,
  user            : dbConfig.user,
  password        : dbConfig.password,
  database        : dbConfig.database
});

module.exports = pool;
