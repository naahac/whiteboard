/**
 * Created by Natanael on 1. 12. 2016.
 */
var express = require('express');
var router = express.Router();
var database = require('../database/database');
database.connect();

router.get('/*', function(req, res, next) {
    var boardId = req.query.boardId;
    //var canvasId = req.query.canvasId;
    //database.insertBoard(boardId);
    database.addCanvasToBoard(boardId, '', function (rows) {
        res.render('canvas', { title: 'Canvas', random: 'Random data' });
    });
});

module.exports = router;
