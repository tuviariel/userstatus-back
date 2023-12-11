const express = require("express");
const router = express.Router();
const UserInfo = require("../models/userInfo");
const mongoose = require("mongoose");

router.post("/", async (req, res, next) => {
    try { 
        const response = await UserInfo.findOne({ userName: req.body.userName, password: req.body.password }).exec();
        if(response){
            // req.session.user = {userName: req.body.userName};
            // req.session.save();
            res.status(200).json({
                message:"user found!",
                user:response
            })
        } else {
            res.status(202).json({
                message:"no user with that user name and/or password...",
            })
        }
    } catch (err) {
        res.status(500).json({
            message:"something went wrong!",
            err: err
        })
    } //finally {
    //}
});

module.exports = router;