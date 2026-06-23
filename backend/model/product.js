const mongoose = require("mongoose")

const mongooseschema = new mongoose.Schema({
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
    }

})
const Product = mongoose.model("Product",mongooseschema)
module.exports=Product
