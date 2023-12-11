const express = require("express");
const router = express.Router();
const UserInfo = require("../models/userInfo");
const WebSocket = require("ws");

const WSServer = new WebSocket.Server({ port: 3001 });
// WSServer.on('headers', (headers, request) => {
//     headers.push('Access-Control-Allow-Origin: http://localhost:3000');
//     headers.push('Access-Control-Allow-Headers: http://localhost:3000');
// console.log(headers);
// console.log(request);
// });
// console.log(WSServer);
// WSServer.on('error', console.error);

router.post("/:userId", async (req, res, next) => {
    const id = req.params.userId
    const status = req.body.status
    try { 
        const response = await UserInfo.findOneAndUpdate({_id:id}, {status:status, ts: Date.now()}, {new: true})
        console.log(WSServer);
        if(response){
            WSServer.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(response));
                }
            });
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
    // }
});

WSServer.on('connection', (ws) => {
    console.log('WebSocket client connected and server is running on port 3001');
  
    // Handle WebSocket messages
    ws.on('message', (message) => {
      console.log(`Received WebSocket message: ${message}`);
    });
  
    // Handle WebSocket disconnections
    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
});

module.exports = router;