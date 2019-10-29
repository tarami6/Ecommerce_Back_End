const User = require("../models/user");
const {errorHandler} = require("../helpres/dbErrorHandler");

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User nor find"
            })
        }
        req.profile = user;
        next()
    })
}

