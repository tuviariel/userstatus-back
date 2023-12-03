const express = require("express");
const router = express.Router();
router.post("/", async (req, res, next) => {
    try {
        if(req.session){
            console.log(req.session);
            req.session.destroy();
        }
            res.status(200).json({
                message:"logged out",
            })
        // } else {
        //     res.status(202).json({
        //         message:"no session destroyed...",
        //     })
        // }
    } catch (err) {
        res.status(500).json({
            message:"something went wrong!",
            err: err
        })
    } //finally {

    //}
});

module.exports = router;