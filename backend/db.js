const mongoose= require("mongoose")

const connectDB = async ()=>{
    try{
            await mongoose.connect(process.env.db_Key)
            console.log("db connect")
    }
    catch(error){
        console.log("not connected")

    }
}
module.exports=connectDB