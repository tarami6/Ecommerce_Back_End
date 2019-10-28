const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const {errorHandler} = require("../helpres/dbErrorHandler");

exports.signup = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json({
            user
        })
    })
}
