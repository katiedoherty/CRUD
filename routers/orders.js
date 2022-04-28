//route for orders:http://localhost:8080/orders
//MUST INSTALL NODEMON GLOBALLY USE COMMAND "npm install -g nodemon" then run script with "nodemon run start"
//To get, post, put and delete the cutomers details use port 8080
 //when posting on postman make sure to change format from text to JSON, otherwise it will not post to mongodb.

const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const Items = require('../models/item');
const Order = require('../models/order');

//gets all the orders
router.get('/', async (req, res) =>{
    try{
        const orders = await Order.find();
        res.json(orders);
    }catch(err){
        res.send('Error'+err)
    }
})

//search for order by id use: http://localhost:8080/orders/62599e8fcf2258045e1c89d0 as an example
router.get('/:id', async (req, res) =>{
    try{
        const orders = await Order.findById(req.params.id);
        res.json(orders);
    }catch(err){
        res.send('Error '+err)
    }
})

//update customers name 
//example search http://localhost:8080/orders/62599e67cf2258045e1c89cf and in the body write FirstName:"Eoin"
router.put('/:id', async (req, res)=>{
    let upid = req.params.id;
    let upname = req.body.FirstName
    
    try{
        //to get the updated name you have to serach for the id again as postman deos not return the updated name
        const orders =await Order.findOneAndUpdate({_id:upid}, {$set:{"customerfromdatabase.FirstName":upname}});
        
        res.json(orders);
    }catch(err){
        res.send('Error '+err)
    }
   
})

//change text format to JSON on postman.
/*to check is the post method works then use {
    
    "item_id":"625995376ec401744000db2d",
    "cust_id":"625997806ec401744000db36"
} only enter the cut id and item id.*/ 
router.post('/', async(req,res)=>{
    const customers = await Customer.findOne({_id: req.body.cust_id});

    const items= await Items.findOne({_id: req.body.item_id});
    const orders = new Order({
        customerfromdatabase:{
            _id: customers._id,
            FirstName:customers.FirstName,
            Surname:customers.Surname,
            ShippingAddress:{
                firstLine:customers.ShippingAddress.firstLine,
                secondline:customers.ShippingAddress.secondline,
                Town:customers.ShippingAddress.Town,
                County:customers.ShippingAddress.County,
                Eircode:customers.ShippingAddress.Eircode
            }
        },
        itemfromdatabase:{
            _id:items._id,
            Manufacturer:items.Manufacturer,
            Model:items.Model,
            Price:items.Price
        }
    });
    
    try{
        const a1 = await orders.save()
        res.json(a1);
     
    }catch(err){
        res.send('Error'+err);
    }
   
    
});

//delete order by id
router.delete('/:id', async (req, res)=>{
    try{
        const orders = await Order.findById(req.params.id);
       // customers.sub = sub.body.sub
        const a1 = await orders.remove();
        res.json(a1);

    }
    catch(err){
        res.send('Error '+err);
    }
})


module.exports = router