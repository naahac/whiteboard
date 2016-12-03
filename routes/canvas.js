/**
 * Created by Natanael on 1. 12. 2016.
 */
var express = require('express');
var router = express.Router();
var database = require('../database/database');
database.connect();

router.get('/*', function(req, res, next) {
    var boardId = req.params[0];
    var canvasId = req.query.canvasId;
    //database.insertBoard(boardId);
    //database.addCanvasToBoard(boardId, 'tests');

    res.render('canvas', { title: 'Canvas', random: 'Random data' });
});

module.exports = router;
