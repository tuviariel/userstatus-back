const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
    const userInfo = {
        name: req.body.userName,
        password: req.body.password
    }

    res.status(200).json({
        message:"it works!",
        user: userInfo
    })
});

module.exports = router;