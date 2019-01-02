//headline controller

var db = require("../models");

module.exports = {
    //find all headlines, sort by date, send them back to the user
    findAll: function(req, res) {
        db.Headline
        .find(req.query)
        .sort({ date: -1 })
        .then(function(dbHeadline) {
            res.json(dbHeadline);
        });
    },
    //Delete the specified headline
    delete: function(req,res) {
        db.Headline.remove({ _id: req.params.id }).then(function(dbHeadline) {
            res.json(dbHeadline);
        });
    }
};
