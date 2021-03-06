var express = require('express');
var router = express.Router();
var Trello = require("node-trello");

/* GET home page. */
router.get('/', function(req, res, next) {
    var t = new Trello("03302260cf80ddc31e5a5d3f9d8ea0e5", req.query.token);
    t.get("/1/members/me/organizations", function(err, data) {
        if (err) console.log(err);
        console.log(data);
        t.get("/1/members/me", function(err, me) {
            if (err) console.log(err);
            console.log(me);
            res.render('organizations', { title: 'Express', username : me.fullName,teams : data});
        });
    });
});
module.exports = router;
