const express = require("express");
const router = express.Router();
const isAuthenticated = require("../services/isAuth")
router.post("/", isAuthenticated, (req, res, next) => {
    res.status(200).json({
        message:"user authorized!"
    })
});

module.exports = router;