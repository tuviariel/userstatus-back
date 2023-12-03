const express = require("express");
const session = require('express-session');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const loginRoute = require("./api/routes/login");
const logoutRoute = require("./api/routes/logout");
const registerRoute = require("./api/routes/register");
const authCheckRoute = require("./api/routes/authCheck");

const RedisStore = require("connect-redis").default;
const Redis = require('redis');

const redisClient = Redis.createClient({
    password: process.env.REDIS_CLIENT_PW,
    socket: {
        host: 'redis-16001.c322.us-east-1-2.ec2.cloud.redislabs.com',
        port: 16001
    }
});
redisClient.connect();
redisClient.on('error', err => console.log('Redis Client Error:', err));
redisClient.on('connect', () => console.log('Connected to redis successfully'));

const redisStore = new RedisStore({ client: redisClient });
const app = express();

mongoose.connect("mongodb+srv://" + process.env.MONGO_ATLAS_UN + ":" + process.env.MONGO_ATLAS_PW + "@cluster0.gdsj68n.mongodb.net/?retryWrites=true&w=majority")

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTION') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
})
app.set('trust proxy', 1);

app.use(
    session({
      store: redisStore,
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false, httpOnly: false, expires:360 },
      serialize: JSON.stringify,
      unserialize: JSON.parse,
    })
);
app.use("/logout", logoutRoute)
app.use("/login", loginRoute)
app.use("/register", registerRoute)
app.use("/isAuth", authCheckRoute)

//error handling:
app.use((req, res, next) => {
    const error = new Error("Not found!")
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message+"am here..."
        }
    });
})

module.exports = app;