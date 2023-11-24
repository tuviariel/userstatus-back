const express = require("express");
const router = express.Router();
const UserInfo = require("../models/userInfo");
const mongoose = require("mongoose");
router.post("/", async (req, res, next) => {
    const userInfo = new UserInfo({
        _id: new mongoose.Types.ObjectId,
        userName: req.body.userName,
        password: req.body.password,
        status: "Working"
    })
    try { 
        const response = await userInfo.save();
        res.status(200).json({
            message:"it works!",
            user: userInfo,
        })
    } catch (err) {
        res.status(500).json({
            message:"something went wrong!",
            user: userInfo,
            err: err
        })
    } //finally {

    //}
});

module.exports = router;