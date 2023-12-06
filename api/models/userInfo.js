const mongoose = require("mongoose");
const userInfoSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userName: String,
    password: String,
    status: String,
    ts: Date
})

module.exports = mongoose.model("UserInfo", userInfoSchema);