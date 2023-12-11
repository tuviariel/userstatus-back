const express = require("express");
const router = express.Router();
const UserInfo = require("../models/userInfo");
const mongoose = require("mongoose");

router.get("/", async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 50;
    const filter = req.query.status
    const search = req.query.search // TODO- enable search..
    let status;
    if (filter) {
        status = {status: filter}
    }
    console.log(filter);
    console.log(status);
    try { 
        
        const response = await UserInfo.find(status).select("_id userName status ts").skip((page-1)*limit).limit(limit);
        if(response){
            const data = {
                amount: response.length,
                page: page,
                users: response,
                message:"users found! page #"+page,
            }
            res.status(200).json(data)
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