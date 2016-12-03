/**
 * Created by Natanael on 1. 12. 2016.
 */
var mysql = require("mysql");
var con;
function getCanvas (canvasId, callback) {
    con.query('SELECT * from canvas where idCanvas = ?', [canvasId], function (err, rows) {
        if (err){
            console.log(err);
            return;}
        console.log('Data received from Db(get canvas):\n');
        console.log(rows);
        callback(rows);
    });
}
module.exports = {
    con : con,
    connect: function () {
        con = mysql.createConnection({
            multipleStatements: true,
            database: "hackathon_baza",
            host: "193.2.176.95",
            user: "admin",
            password: "admin"
        });
        con.connect(function (err) {
            if (err) {
                console.log('Error connecting to Db' + err.message);
                return;
            }
            console.log('Connection established');
        });
    },
    select: function (query) {
        con.query(query, function (err, rows) {
            if (err) throw err;
            console.log('Data received from Db:\n');
            console.log(rows);
            return rows
        });
    },
    insertBoard: function (boardId) {
        con.query('INSERT INTO boards (idBoard) VALUES (?)', [boardId], function (err, rows) {
            if (err){
                console.log(err);
                return;}
            console.log('Data received from Db(insert into boards):\n');
            console.log(rows);
            return rows
        });
    },
    addCanvasToBoard: function (boardId, data) {
        con.query('INSERT INTO canvas (idBoard, canvasData) VALUES (?, ?)', [boardId, data], function (err, rows) {
            if (err){
                console.log(err);
                return;}
            console.log('Data received from Db(insert into canvas):\n');
            console.log(rows);
            return rows
        });
    },
    getCanvas: function getCanvas (canvasId, callback) {
        con.query('SELECT * from canvas where idCanvas = ?', [canvasId], function (err, rows) {
            if (err){
                console.log(err);
                return;}
            console.log('Data received from Db(get canvas):\n');
            console.log(rows);
            callback(rows);
        });
    },
    updateCanvas: function (canvasId,data, callback) {
        getCanvas(canvasId, function (rows) {
            var origData = JSON.parse(rows[0].canvasData);
            origData.points = origData.points.concat(data.points);
            con.query('UPDATE canvas set canvasData = ? where idCanvas = ?', [JSON.stringify(origData), canvasId], function (err, rows) {
                if (err){
                    console.log(err);
                    return;}
                console.log('Data received from Db(update canvas):\n');
                console.log(rows);
                callback(rows);
            });
        });
    },
    addSocketToCanvas: function (canvasId, socketId) {
        con.query('INSERT IGNORE INTO canvasClient (idCanvas, clientId) VALUES (?, ?)', [canvasId, socketId, canvasId], function (err, rows) {
            if (err){
                console.log(err);
                return;}
            console.log('Data received from Db(insert into canvas clients):\n');
            console.log(rows);
            return rows
        });
    },
    addPictureToCanvas: function (canvasId, data) {
        con.query('INSERT INTO pictures (pictureData, canvasId) VALUES (?, ?)', [data,canvasId], function (err, rows) {
            if (err){
                console.log(err);
                return;}
            console.log('Data received from Db(insert into pictures):\n');
            console.log(rows);
            return rows
        });
    },
    getPicturesByCanvasId: function (canvasId, callback) {
        con.query('select pictureData from pictures where canvasId = ?', [canvasId], function (err, rows) {
            if (err){
                console.log(err);
                return;}
            console.log('Data received from Db(select pictures):\n');
            console.log(rows);
            callback(rows);
        });
    },
    removeSocket: function (socketId) {
        con.query('DELETE FROM canvasClient WHERE clientId = ?', [socketId], function (err, rows) {
            if (err){
                console.log(err);
                return;}
            console.log('Data received from Db(delete canvas clients):\n');
            console.log(rows);
            return rows
        });
    },
    getClientsByCanvasId: function (canvasId, callback) {
        con.query('SELECT clientId from canvasClient where idCanvas = ?', [canvasId], function (err, rows) {
            if (err){
                console.log(err);
                return;
            }
            console.log('Data received from Db(get canvas clients):\n');
            console.log(rows);
            callback(rows);
        });
    }
}

