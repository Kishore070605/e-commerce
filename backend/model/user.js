const mongoose = require("mongoose")
 
const mongooseschema = new mongoose.Schema({
    username:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    role:{
        type : String,
        required : true
    },
    profileimage:{
        type : String
    },
    mobile:{
        type : String
    }

})
const User = mongoose.model("User",mongooseschema)
module.exports=User 
