const express = require("express");
const session = require('express-session');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const loginRoute = require("./api/routes/login");
const registerRoute = require("./api/routes/register");
const authCheckRoute = require("./api/routes/authCheck")
const redisStore = require("./api/services/redisStore")
const app = express();

app.use(
    session({
      store: redisStore,
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false, httpOnly: false, expires:3600 },
    })
  );

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