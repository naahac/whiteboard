var express = require('express');
var path = require('path');

var ws = require('websocket.io')
    , http = require('http').createServer().listen(3000)
    , server = ws.attach(http)
var clients = []

server.on('connection', function (socket) {
    console.log("client connected");
    clients.push(socket);
    socket.on('data', function (data) {
        console.log(data);
        clients.forEach(function (client) {
            client.send(data + " response to all!!!");
        })
    });
    socket.on('close', function () {
        console.log("conn closed");
    });
});
