var express = require('express');
var router = express.Router();
var Trello = require("node-trello");

/* GET home page. */
router.get('/', function(req, res, next) {
    var t = new Trello("03302260cf80ddc31e5a5d3f9d8ea0e5", req.query.token);
    t.get("/1/members/me", function(err, data) {
        if (err) throw err;
        console.log(data);
        res.render('team', { title: 'Express',username: data.username});
    });

// // URL arguments are passed in as an object.
//     t.get("/1/members/me", { cards: "open" }, function(err, data) {
//         if (err) throw err;
//         console.log(data);
//     });

});



module.exports = router;
