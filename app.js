var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(8080)
var io = require('socket.io').listen(server);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

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
module.exports = app;

var clients = []
io.on('connection', function (socket) {
    console.log("client connected");
    clients.push(socket);
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('testField', function (data) {
        console.log(data);
        clients.forEach(function (client) {
            console.log('sending : ' + data + ' to: ' + socket.ip);
            client.emit('testBroadcast', data);
        })
    });
    socket.on('close', function () {
        console.log("conn closed");
    });
    socket.on('syncCanvas', function (data) {
        console.log("syncin canvas");
        clients.forEach(function (client) {
            console.log('sending : ' + data + ' to: ' + socket.conn.remoteAddress);
            client.emit('syncCanvas', data);
        })
    });
});
console.log("initialized");