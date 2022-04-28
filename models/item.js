const mongoose = require('mongoose');


const itemSchema = new mongoose.Schema({
    Manufacturer:{
        type:String
       
    },
    Model:{
        type:String,
        required:true
    },
   Price:{
        type:String,
        required:true
    },
    
})

module.exports=mongoose.model('Items', itemSchema)