const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');


const customeritemSchema = new mongoose.Schema({
    itemfromdatabase:{
        _id:{
            type:String,
            required:true
        },
        Manufacturer:{
            type:String
           
        },
        Model:{
            type:String,
        
        },
       Price:{
            type:String,
        
        }
      
    },
    customerfromdatabase:{
        _id:{
            type:String,
            required:true

        },
        FirstName:{
            type:String,
           
        },
        Surname:{
            type:String,
           
        },
        
        
        ShippingAddress:{
            firstLine:{
                type:String,
               
            },
            secondLine:{
                type:String
            },
            Town:{
                type:String,
          
            },
            County:{
                type:String,
            
            },
            Eircode:{
                type:String,
              
            }
    
        }
        
       
    }
    
})

module.exports=mongoose.model('Customeritems', customeritemSchema)