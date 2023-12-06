const express = require("express");
const router = express.Router();
const UserInfo = require("../models/userInfo");
const mongoose = require("mongoose");

router.post("/:userId", async (req, res, next) => {
    const id = req.params.userId
    const status = req.body.status
    // console.log(id, status);
    try { 
        const response = await UserInfo.findOneAndUpdate({_id:id}, {status:status, ts: Date.now()}, {new: true})
        console.log(response);
        if(response){
            res.status(200).json(response)
        } else {
            res.status(200).json({
                message:"no users found",
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