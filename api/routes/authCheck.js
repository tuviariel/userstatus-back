const express = require("express");
const router = express.Router();
// const isAuthenticated = require("../services/isAuth")
const isAuthenticated = (req, res, next) => {
    console.log(req.session.cookie);
    console.log(req.session.user);
    if (req.session && req.session.user) {
        console.log("authorized");
        return next();
    }
    else {
        console.log("un-authorized");
        return res.status(401).json({message:'Unauthorized'});
    }
}
router.post("/", isAuthenticated, (req, res, next) => {
    res.status(200).json({
        message:"user authorized!"
    })
});

module.exports = router;