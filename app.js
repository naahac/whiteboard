var express = require('express');
var http = require('http');
var app = express();
app.set('port', (process.env.PORT || 80));
var server = http.createServer(app)
var io = require('socket.io').listen(server);
server.listen(process.env.PORT || 80);
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var organizations = require('./routes/organizations');
var team = require('./routes/team');
var index = require('./routes/index');
var canvas = require('./routes/canvas');
var database = require('./database/database');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/canvas', canvas);
app.use('/team', team);
app.use('/organizations', organizations);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var clients = []
io.on('connection', function (socket) {
    console.log("client connected");
    clients.push(socket);
    socket.on('disconnect', function(){
        database.removeSocket(socket.id);
        console.log('user disconnected' + socket.id);
    });
    socket.on('close', function () {
        console.log("conn closed");
    });
    socket.on('addSocketToCanvas', function (boardId) {
        console.log("addSocketToCanvas");
        database.addSocketToCanvas(boardId, socket.id)
        database.getCanvas(boardId, function (data) {
            console.log('init canvas data');
            //data[0].canvasData.startIndex = 0
            if(data.length > 0){
                console.log(data[0].canvasData);
                socket.emit('syncCanvas', data[0].canvasData);
            }
        });
    });

    // socket.on('uploadPicture', function (boardId, data) {
    //     database.addPictureToCanvas(boardId, data);
    // });
    //
    // socket.on('getPicture', function (boardId) {
    //     database.getPicturesByBoardId(boardId, function(rows){
    //         if(rows.length == 0) return;
    //         var pictureData = rows[0].pictureData;
    //         socket.emit('receivePicture', pictureData);
    //     });
    // });

    socket.on('syncCanvas', function (boardId, data) {
        console.log("syncin canvas");
        database.updateCanvas(boardId, data, function (rows) {
            console.log(rows);
            database.getClientsByBoardId(boardId, function (canvasClients) {
                // database.getCanvas(canvasId, function (data) {
                    clients.forEach(function (client) {
                        canvasClients.forEach(function (curr) {
                            if(curr.clientId == client.id){
                                console.log('sending : ' + JSON.stringify(data) + '\n to: ' + socket.conn.remoteAddress);
                                client.emit('syncCanvas', data);
                            }
                        });
                    })
                // });
            });
        })
    });
});

module.exports = {
    app: app,
    io: io
};
