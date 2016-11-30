/**
 * Created by Natanael on 30. 11. 2016.
 */
var http = require('http');
var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 5000));
var server = http.createServer(app)
var io = require('socket.io').listen(server);
server.listen(process.env.PORT || 5000);

var sesionData
var clients = []
io.on('connection', function (socket) {
    console.log("client connected");
    clients.push(socket);
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('initCanvas', function () {
        if(sesionData == undefined) return;
        console.log('init' + sesionData.valueOf())
        socket.emit('syncCanvas', sesionData);
    })
    socket.on('close', function () {
        console.log("conn closed");
    });
    socket.on('syncCanvas', function (data) {
        console.log("syncin canvas");
        sesionData = data;
        clients.forEach(function (client) {
            console.log('sending : ' + data + ' to: ' + socket.conn.remoteAddress);
            client.emit('syncCanvas', sesionData);
        })
    });
});