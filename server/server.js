// server.js — Entry point
require('dotenv').config({path:'./.env'}); //the first file genertaes then all things also executes withis this file so we need dotenv mean s0 all environment variable also load as soon as possible with this file and application doesnt have to wait 
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:8080",
  credentials: true
})); //  .use is used in middle ware connection or configure purpose 
app.use(express.json());

const PORT = process.env.PORT || 5000;
connectDB()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server is running at port : ${PORT}`);
    })
})
.catch((err)=>{
    console.log("Mongo db connection failed: ",err);
})

app.get("/", (req,res)=>{
  res.send("Hostel Harmony API running");
});
// Routes
// FRONTEND LINK: Each route corresponds to frontend service calls in src/services/*
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/leave', require('./routes/leaveRoutes'));
app.use('/api/bills', require('./routes/billRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

