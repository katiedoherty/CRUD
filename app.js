//MUST INSTALL NODEMON GLOBALLY USE COMMAND "npm install -g nodemon" then run script with "nodemon run start"
//To get, post, put and delete the cutomers details use port 8080
 //when posting on postman make sure to change format from text to JSON, otherwise it will not post to mongodb.

const express = require('express');
const mongoose = require('mongoose')
const url = 'mongodb+srv://katiedoherty:chocolate@cluster0.l0dt1.mongodb.net/mobile-phone-store?retryWrites=true&w=majority'
const app = express();

mongoose.connect(url, {useNewUrlParser:true});
const con = mongoose.connection

//connection to mongodb
con.on('open', () =>{
    console.log('connected....');
})

app.use(express.json());
//need to send any requests for the customer to the folder in routers called customers
const customerRouter = require('./routers/customers')
app.use('/customers', customerRouter)
const itemRouter = require('./routers/items')
app.use('/items', itemRouter)
const customeritemRouter = require('./routers/orders')
app.use('/orders', customeritemRouter)
//app listening on what port
app.listen(8080, () =>{
    console.log("server started");
})

