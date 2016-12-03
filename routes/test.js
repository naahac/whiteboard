var express = require('express');
var router = express.Router();
var mysql = require("mysql");

// First you need to create a connection to the db
var con = mysql.createConnection({
    database: "sys",
    host: "164.8.212.153",
    user: "admin",
    password: "admin"
});

con.connect(function(err){
    if(err){
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});

// con.end(function(err) {
//     // The connection is terminated gracefully
//     // Ensures all previously enqueued queries are still
//     // before sending a COM_QUIT packet to the MySQL server.
// });

router.get('/', function(req, res, next) {
    con.query('SELECT * FROM employees',function(err,rows){
        if(err) throw err;
        console.log('Data received from Db:\n');
        console.log(rows);
        res.send(rows);
    });
});

module.exports = router;
