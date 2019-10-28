const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    hashed_password: {
        type: String,
        trim: true
    },
    about: {
        type: String,
        trim: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    },
}, {timestamp: true})

//virtual field
userSchema
    .virtula("password")
    .setValue(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function() {
        return this._password
    })

userSchema.method = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) == this.hashed_password;
    },
    encryptPassword: function (password) {
        if(!password) return "";
        try{
            return crypto.createHmac("sha1", this.salt)
                .update(password)
                .digest("hex")
        } catch (e) {
            console.log("error encryptPassword")
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema)
