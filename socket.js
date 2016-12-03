/**
 * Created by Natanael on 30. 11. 2016.
 */
// function connect(socket) {
//     console.log("client connected");
//     clients.push(socket);
//     socket.on('disconnect', function(){
//         console.log('user disconnected');
//     });
//     socket.on('initCanvas', function () {
//         if(sesionData == undefined) return;
//         console.log('init' + sesionData.valueOf())
//         socket.emit('syncCanvas', sesionData);
//     })
//     socket.on('close', function () {
//         console.log("conn closed");
//     });
//     socket.on('syncCanvas', function (data) {
//         console.log("syncin canvas");
//         sesionData = data;
//         clients.forEach(function (client) {
//             console.log('sending : ' + data + ' to: ' + socket.conn.remoteAddress);
//             client.emit('syncCanvas', sesionData);
//         })
//     });