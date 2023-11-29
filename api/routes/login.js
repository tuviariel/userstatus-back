const express = require("express");
const router = express.Router();
// const app = require("../../app");
// const redisStore = require("../services/redisStore")
const UserInfo = require("../models/userInfo");
const mongoose = require("mongoose");
router.post("/", async (req, res, next) => {
    try { 
        const response = await UserInfo.findOne({ userName: req.body.userName } && { password: req.body.password }).exec();
            // console.log(response);
            // sess.user = req.body.userName
            // sess.pass = req.body.password
        if(response){
            // app.use(
            //     session({
            //       store: redisStore,
            //       secret: 'your-secret-key',
            //       resave: false,
            //       saveUninitialized: true,
            //       cookie: { secure: false, httpOnly: false, expires:3600 },
            //     })
            //   );
            req.session.user = {userName: req.body.userName, sid: "sid:" + req.body.userName + req.body.password};
            res.status(200).json({
                message:"user found!",
                // sess:sess
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