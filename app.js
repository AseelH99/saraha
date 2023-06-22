require('dotenv').config();
const express = require('express');
const app= express();
const schedule = require('node-schedule');
const authRouter = require('./modules/auth/auth.route');
const userRouter=require('./modules/user/user.route');
const messageRouter=require('./modules/message/message.route');
const { connectDB } = require('./DB/connection');
const baseurl =process.env.BASEURL;
app.use(express.json());
connectDB();
app.use(`${baseurl}/upload`,express.static('./upload'));
app.use(`${baseurl}/auth`,authRouter);
app.use(`${baseurl}/user`,userRouter);
app.use(`${baseurl}/message`,messageRouter);
app.use('*',(req,res)=>{
    res.json({"message":"page not found !"});
});
const job = schedule.scheduleJob('0 41 10 * * *', function(){
    console.log('The answer to life, the universe, and everything!');
  });


app.listen(3000);




