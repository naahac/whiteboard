var express = require('express');
var router = express.Router();
var database = require('../database/database')

router.get('/', function(req, res, next) {
    //database.insertBoard('firstBoard1234');
    res.send(database.select('SELECT * FROM boards'));
});

module.exports = router;
