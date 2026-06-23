const jwt = require("jsonwebtoken")
const auth = (req,res,next)=>{
    const token = req.cookies?.token
    if(!token){
        return res.status(401).json({
            status : false,
            message : "token not found"
        })
    }
    try{
        const decode = jwt.verify(token, process.env.jwt_sec_key)
        req.user = decode
        return next()
    }catch(error){
        return res.status(401).json({
            status : false,
            message : "Invalid token"
        })
    }
}

module.exports = auth