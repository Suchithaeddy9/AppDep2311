const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const path=require("node:path");
const dotenv=require("dotenv");
dotenv.config();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({ storage: storage })

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/uploads",express.static("uploads"));

app.use(express.static(path.join(__dirname,"./client/build")));

let authoriseToken=(req,res,next)=>{
    console.log(req.headers.authorization);
    next();
}
app.use(authoriseToken);

let userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    password: String,
    mobileNo: String,
    profilePic: String

})

let User = new mongoose.model("user", userSchema);
//app.get("./signup",async(req,res)=>{
//res.json(["Some Dummy Response."]);
//})
app.post("/Signup", upload.single("profilePic"), async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    let emailUser=await User.find().and({email:req.body.email})
    if(emailUser.length>0){
        res.json({status:"Failed",msg:"User Already Exist."})
    }else{
        let hashedPassword=await bcrypt.hash(req.body.password,10);
        try {
            let newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age:Number(req.body.age),
                email: req.body.email,
                password: hashedPassword,
                mobileNo: req.body.mobileNo,
                profilePic: req.file.path
            })
    
            await User.insertMany([newUser]);
            res.json({ status: "Success", msg: "User Created Successfully." });
        } catch (err) {
            res.json({ status: "Failed", msg: "Unable to Create a User." })
            console.log(err)
        }
    }
    //res.json(["Some Dummy Response."]);
    

})
app.post("/Login1",upload.none(),async(req,res)=>{
    console.log(req.body);
    let userDetails=await User.find().and({email:req.body.email})
    console.log(userDetails);
    if(userDetails.length>0){
        if(await bcrypt.compare(req.body.password,userDetails[0].password)==true){
            let token=jwt.sign(
                {
                    email:req.body.email,password:req.body.password
                },
                "bazooka"
                )
            let userDataToSend={
                firstName:userDetails[0].firstName,
                lastName:userDetails[0].lastName,
                age:userDetails[0].age,
                email:userDetails[0].email,
                password:userDetails[0].password,
                mobileNo:userDetails[0].mobileNo,
                profilePic:userDetails[0].profilePic,
                token:token
            }
            res.json({status:"Success",data:userDataToSend})
        }else{
            res.json({status:"Failed",msg:"Invalid Password."})  
        }
    }else{
        res.json({status:"Failed",msg:"User Doesn't Exist."})
    }
    //console.log(useDetails)
    //res.json(["Some Dummy Response."])
})

app.post("/Login1WithToken",upload.none(),async(req,res)=>{
    console.log(req.body);
    let decryptedToken=jwt.verify(req.body.token,"bazooka");
    console.log(decryptedToken);

    let userDetails=await User.find().and({email:decryptedToken.email})
    if(userDetails.length>0){
        if(userDetails[0].password==decryptedToken.password){
            let userDataToSend={
                firstName:userDetails[0].firstName,
                lastName:userDetails[0].lastName,
                age:userDetails[0].age,
                email:userDetails[0].email,
                password:userDetails[0].password,
                mobileNo:userDetails[0].mobileNo,
                profilePic:userDetails[0].profilePic,
            }
            res.json({status:"Success",data:userDataToSend})
        }
        else{
            res.json({status:"Failed",msg:"Invalid Token"})
        }
    }else{
        res.json({status:"Failed",msg:"Invalid Token"})
    }

    //res.json(["Some Dummmy Response."])
})

app.patch("/updateProfile",upload.single("profilePic"),async(req,res)=>{
    console.log(req.body);
    try{
    if(req.body.firstName.trim().length>0){
    let updatedDetails=await User.updateMany({email:req.body.email},{firstName:req.body.firstName})
    }
    if(req.body.lastName.trim().length>0){
        let updatedDetails=await User.updateMany({email:req.body.email},{lastName:req.body.lastName})
    }
    if(req.body.age.trim().length>0){
        let updatedDetails=await User.updateMany({email:req.body.email},{age:req.body.age})
    }
    if(req.body.password.trim().length>0){
        let updatedDetails=await User.updateMany({email:req.body.email},{password:req.body.password})
    }
    if(req.body.mobileNo.trim().length>0){
        let updatedDetails=await User.updateMany({email:req.body.email},{mobileNo:req.body.mobileNo})
    }
    console.log(req.file);
    if(req.file){
        let updatedDetails=await User.updateMany({email:req.body.email},{profilePic:req.file.path})
    }
    res.json({status:"Success",msg:"User Details Updated Successfuuly."})
    }catch(err){
        res.json({status:"Failed",msg:"Unable to Updated User Details.",err:err})
    }
    //res.json(["Some Dummy Response."])
})

app.delete("/deleteProfile",upload.none(),async (req,res)=>{
    console.log(req.body);
    try{
        let deleteDetails=await User.deleteMany({email:req.body.email});
        res.json({status:"Success",msg:"User Deleted Successfully."})
    }catch(err){
        res.json({status:"Failed",msg:"Unable to Delete User.",err:err})
    }
    //res.json(["Some Dummy Response."]);  
})
app.listen(process.env.port,() => {
    console.log(`Listening to Port is ${process.env.port}.`);
})
let connectToMDB = async () => {
    try {
        //await mongoose.connect("mongodb+srv://Suchitha:Suchitha@cluster0.mz3nnqn.mongodb.net/Suchitha?retryWrites=true&w=majority&appName=Cluster0");
        await mongoose.connect(process.env.mdburl);
        console.log("Successfully Connected to MDB.")
    } catch (err) {
        console.log("Unable to Connect to MDB")
        console.log(err);
    }
}

connectToMDB();


