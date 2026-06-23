const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../model/user")
const router = express.Router()
const upload = require("../middlewear/upload")
const Product = require("../model/product")
const Cart = require("../model/cart")
const Order = require("../model/order")
const rateLimit = require("express-rate-limit")
const auth = require("../middlewear/auth")


const loginLimit = rateLimit({
    windowMs : 10 * 60 * 1000,
    max : 7,
    message :{
        status : "false",
        message : "to many request"
    }
})



router.post("/register",async(req,res)=>{
    try{
        const {username,email,password} = req.body
        const hasedPassword=await bcrypt.hash(password,10)
        const user = new User({username,email,password : hasedPassword,role:"user"})
        await user.save()
        res.status(201).json({
            status : true,
            message : "saved"
        })
    }
    catch(error){
        res.status(500).json({
            status : false,
            message : error.message
        })
    }
})

// router.post("/login",async(req,res)=>{
//     try{
//         const {email,password} = req.body
//         const user = await User.findOne({email,password})
//         if(user){
//             res.status(200).json({
//                 status : true,
//                 message : "access granted",
//                 role : user.role
//             })
//         }else{
//             res.status(401).json({
//                 status : false,
//                 message : "invalid credentials"
//             })}  
//     }catch(error){
//          res.status(500).json({
//             status : false,
//             message : error.message || "failed"
//          })
//     }
// })


router.post("/login",loginLimit, async (req, res) => {


    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (!user) {
        return res.json({
            status: false,
            message: "User not found"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.json({
            status: false,
            message: "Incorrect password"
        });
    }

    const token = jwt.sign(
        {email : user.email, role : user.role},
        process.env.jwt_sec_key,
        {expiresIn : "1d"}
    )

    res.cookie("token",token,{
        httpOnly : true,
        secure : false,
        sameSite : "strict",
        maxAge : 24 *60 *60 *1000
    })

    res.json({
        status: true,
        message: "Login Successful",
        role:user.role
    });

});


router.get("/Userdata",auth,async(req,res)=>{
    try{
        const user = await User.find()
        res.status(200).json({
            status : true,
            message : "true",
            user : user
        })
    }catch(error){
         res.status(500).json({
            status : false,
            message : error.message || "failed"
         })

    }
})


// upload products

router.post("/addproduct",auth,upload.single("productimage"),async(req,res)=>{
    try{
        const {productname,price,category,description} = req.body
        const product = new Product({productname,price,category,productimage:req.file.filename,description})
        await product.save()
        res.status(200).json({
            status : true,
            message : "Product saved successfully",
            product : product
        })
    }catch(error){
         res.status(500).json({
            status : false,
            message : error.message || "failed"
         })

    }
})


router.get("/viewproduct",auth,async(req,res)=>{
    try{
        const product = await Product.find()
        res.status(200).json({
            status : true,
            message : "true",
            product : product
        })
    }catch(error){
         res.status(500).json({
            status : false,
            message : error.message || "failed"
         })

    }
})


// view products

router.get("/Viewproducts",auth,async(req,res)=>{
    try{
        const viewproducts = await Product.find()
        res.status(200).json({
            status : true,
            message : "true",
            viewproducts : viewproducts
        })
    }catch(error){
         res.status(500).json({
            status : false,
            message : error.message || "failed"
         })

    }
})




// cart

router.post("/Cart",auth,async(req,res)=>{
    try{
        const {email,id} = req.body
        const product = await Product.findById(id)
        if(!product){
            return res.status(404).json({
                status: false,
                message: "Product not found"
            })
        }

        let cart = await Cart.findOne({email})
        if(!cart){
            cart = new Cart({
                email,
                products: [{
                    productname: product.productname,
                    price: product.price,
                    category: product.category,
                    productimage: product.productimage,
                    description: product.description,
                    quentity: 1
                }]
            })
        } else {
            const existingItem = cart.products.find(item => item.productname === product.productname && item.productimage === product.productimage)
            if(existingItem){
                existingItem.quentity = Number(existingItem.quentity || 0) + 1
            } else {
                cart.products.push({
                    productname: product.productname,
                    price: product.price,
                    category: product.category,
                    productimage: product.productimage,
                    description: product.description,
                    quentity: 1
                })
            }
        }

        await cart.save()

        res.status(200).json({
            status : true,
            message : "Cart updated",
            cart : cart
        })
    }catch(error){
         res.status(500).json({
            status : false,
            message : error.message || "failed"
         })

    }
})



router.post("/addCart",auth,async(req,res)=>{
    try{
        const {email,id} = req.body
        const cart = await Cart.findOne({email})
        res.status(200).json({
            status : true,
            message : "Cart retrieved",
            cart : cart
        })
    }catch(error){
         res.status(500).json({
            status : false,
            message : error.message || "failed"
         })

    }
})



//update quantity in cart

router.post("/updateQuantity",auth, async(req,res)=>{
    try{
        const {email, id, quantity} = req.body
        const qty = Number(quantity) || 1

        const cart = await Cart.findOneAndUpdate(
            { email, "products._id": id },
            { $set: { "products.$.quentity": qty } },
            { new: true }
        )

        if(!cart){
            return res.status(404).json({
                status: false,
                message: "Cart not found"
            })
        }

        res.status(200).json({
            status : true,
            message : "Quantity updated",
            cart : cart
        })
    }catch(error){
         res.status(500).json({
            status : false,
            message : error.message || "failed"
         })
    }
})


//remove from cart

router.post("/removeFromCart",auth, async(req,res)=>{
    try{
            const {email,id} = req.body

            const cart = await Cart.findOneAndUpdate(
                { email },
                { $pull: { products: { _id: id } } },
                { new: true }
            )

            if(!cart){
                return res.status(404).json({
                    status: false,
                    message: "Cart not found"
                })
            }

            res.status(200).json({
                status : true,
                message : "Item removed from cart",
                cart : cart
            })
    }catch(error){
         res.status(500).json({
            status : false,
            message : error.message || "failed"
         })
    }
})



// add orders

router.post("/addOrder",auth,async(req,res)=>{
    try{
        const {email} = req.body
        const cart = await Cart.findOne({email})
        if(!cart || !cart.products || cart.products.length === 0){
            return res.status(404).json({
                status: false,
                message: "Cart is empty or not found"
            })
        }

        const order = new Order({
            email,
            products: cart.products
        })

        await order.save()

        cart.products = []
        await cart.save()

        res.status(200).json({
            status : true,
            message : "Order created successfully",
            order: order
        })
    }catch(error){
         res.status(500).json({
            status : false,
            message : error.message || "failed"
         })
    }
})



// view orders

router.post("/viewOrders",auth,async(req,res)=>{
    try{
        const {email} = req.body
        const orders = await Order.find({email})

        res.status(200).json({
            status : true,
            message : "success",
            orders: orders
        })

    }catch(error){
         res.status(500).json({
            status : false,
            message : error.message || "failed"
         })
    }
})



//remove products that are added by the admin

router.post("/removeFromProduct",auth, async(req,res)=>{
    try{
            const {email,id} = req.body
            console.log(email,id)

            const product = await Product.findOneAndDelete({ _id:id })


            res.status(200).json({
                status : true,
                message : "Item removed",
            })
    }catch(error){
         res.status(500).json({
            status : false,
            message : error.message || "failed"
         })
    }
})


// searchbar

router.post("/search",auth,async(req,res)=>{
    try{
        const {search} = req.body
        const viewproducts = await Product.find({productname : {$regex:search, $options:"i"} })
        res.status(200).json({
            status : true,
            message : "true",
            viewproducts : viewproducts
        })
    }catch(error){
         res.status(500).json({
            status : false,
            message : error.message || "failed"
         })

    }
})


module.exports=router