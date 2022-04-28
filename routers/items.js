//route http://localhost:8080/items
//MUST INSTALL NODEMON GLOBALLY USE COMMAND "npm install -g nodemon" then run script with "nodemon run start"
//To get, post, put and delete the cutomers details use port 8080
 //when posting on postman make sure to change format from text to JSON, otherwise it will not post to mongodb.

const express = require('express');
const router = express.Router();
const Items = require('../models/item');

//get all information for items by seraching http://localhost:8080/items
router.get('/', async (req, res) =>{
    try{
        const items = await Items.find();
        res.json(items);
    }catch(err){
        res.send('Error'+err)
    }
})

//get item by id. example http://localhost:8080/items/6258164d895b3e5faab7b5e8
router.get('/:id', async (req, res) =>{
    try{
        const items = await Items.findById(req.params.id);
        res.json(items);
    }catch(err){
        res.send('Error '+err)
    }
})

//update method by seraching for id and writing the manufacturer name in the body
router.put('/:id', async (req, res)=>{
    let upid = req.params.id;
    let upname = req.body.Manufacturer
    
    try{
        //to get the updated name you have to serach for the id again as postman deos not return the updated name
        const items =await Items.findOneAndUpdate({_id:upid}, {$set:{Manufacturer:upname}});
        res.json(items);
    }catch(err){
        res.send('Error '+err)
    }
   
})

//change text format to JSON on postman.
router.post('/', async(req,res)=>{
    const newitems = new Items({
        Manufacturer:req.body.Manufacturer,
        Model: req.body.Model,
        Price:req.body.Price
    });

    try{
        const a1 = await newitems.save()
        res.json(a1);
        console.log(a1);
    }catch(err){
        res.send('Error'+err);
    }
   
    
});

//delete a document by searching for id in route.
router.delete('/:id', async (req, res)=>{
    try{
        const items = await Items.findById(req.params.id);
     
        const a1 = await items.remove();
        res.json(a1);

    }
    catch(err){
        res.send('Error '+err);
    }
})


module.exports = router