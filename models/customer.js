const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
    Title:{
        type:String
       
    },
    FirstName:{
        type:String,
        required:true
    },
    Surname:{
        type:String,
        required:true
    },
    
    Mobile:{
        type:String,
        required:true
        },
    EmailAddress:{
        type:String,
        required:true
    },
    HomeAddress:{
       
        firstLine:{
            type:String,
            required :true
        },
        secondLine:{
            type:String,
            
        },
        Town:{
            type:String,
            required :true
        },
        County:{
            type:String,
            required :true
        },
        Eircode:{
            type:String,
           
        }
    },
    ShippingAddress:{
        firstLine:{
            type:String,
            required:true
        },
        secondLine:{
            type:String
        },
        Town:{
            type:String,
            required:true
        },
        County:{
            type:String,
            required:true
        },
        Eircode:{
            type:String,
          
        }

    }
    
})

module.exports=mongoose.model('Customer', customerSchema)