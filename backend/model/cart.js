const mongoose = require("mongoose")

const mongooseschema = new mongoose.Schema({

    email:{
        type : String,
        required : true
    },
    products:[{
        productname:{
            type : String,
            required : true
        },
        price:{
            type : String,
            required : true
        },
        category:{
            type : String,
            required : true
        },
        productimage:{
            type : String,
            required : true
        },
        description:{
            type : String,
            required : true
        },
        quentity:{
            type : String,
            require : true
        }
    }]

})
const Cart = mongoose.model("Cart",mongooseschema)
module.exports=Cart
