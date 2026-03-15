const db = require('../models/connection');

function emote(req, res){
    res.send(":3");
}

module.exports = {
    emote
}