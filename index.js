require("dotenv").config()

const express = require('express');
const mongoose = require('mongoose');
const corsMiddleware = require("./middleware/cors.middleware");

const cookieParser = require("cookie-parser")
const PORT = 5000
const app = express();

const router = require('./routes/index');

app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const start = async () => {

    try{
        await mongoose.connect(process.env.MONGO_URL)
        
        app.listen(PORT, () => {
            console.log("Server has been started on port:", PORT)
        })
        
    } catch(e) {
        
    }
}

start()