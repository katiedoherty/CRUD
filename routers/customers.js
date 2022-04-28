//route for customers http://localhost:8080/customers
//MUST INSTALL NODEMON GLOBALLY USE COMMAND "npm install -g nodemon" then run script with "nodemon run start"
//To get, post, put and delete the cutomers details use port 8080
 //when posting on postman make sure to change format from text to JSON, otherwise it will not post to mongodb.
const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
router.get('/', async (req, res) =>{
    try{
        const customers = await Customer.find();
        res.json(customers);
    }catch(err){
        res.send('Error'+err)
    }
})

//get customer by id in the route example http://localhost:8080/customers/625997216ec401744000db34
router.get('/:id', async (req, res) =>{
    try{
        const customers = await Customer.findById(req.params.id);
        res.json(customers);
    }catch(err){
        res.send('Error '+err)
    }
})

//update method: search for customer id and update their name
router.put('/:id', async (req, res)=>{
    let upid = req.params.id;
    let upname = req.body.FirstName
    
    try{
        //to get the updated name you have to serach for the id again as postman deos not return the updated name
        const customers =await Customer.findOneAndUpdate({_id:upid}, {$set:{FirstName:upname}});
        res.json(customers);
    }catch(err){
        res.send('Error '+err)
    }
   
})

//change text format to JSON on postman.
router.post('/', async(req,res)=>{
    const newcustomers = new Customer({
        FirstName: req.body.FirstName,
        Surname: req.body.Surname,
        Mobile:req.body.Mobile,
        EmailAddress:req.body.EmailAddress,
        HomeAddress:{
            firstLine:req.body.HomeAddress.firstLine,
          secondline:req.body.HomeAddress.secondline,
          Town:req.body.HomeAddress.Town,
          County:req.body.HomeAddress.County,
          Eircode:req.body.HomeAddress.Eircode
        },
        ShippingAddress:{
            firstLine:req.body.ShippingAddress.firstLine,
            secondline:req.body.ShippingAddress.secondline,
            Town:req.body.ShippingAddress.Town,
            County:req.body.ShippingAddress.County,
            Eircode:req.body.ShippingAddress.Eircode
        }
    });

    try{
        const a1 = await newcustomers.save()
        res.json(a1);
        console.log(a1);
    }catch(err){
        res.send('Error'+err);
    }
   
    
});

//delete customer by id 
router.delete('/:id', async (req, res)=>{
    try{
        const customers = await Customer.findById(req.params.id);
        const a1 = await customers.remove();
        res.json(a1);

    }
    catch(err){
        res.send('Error '+err);
    }
})


module.exports = router