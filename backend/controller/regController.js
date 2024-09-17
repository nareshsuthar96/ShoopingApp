const Reg = require("../model/Register")
const bcrypt = require("bcrypt")


exports.Register = async (req,res)=>{
const {username,password,email,role} = req.body
console.log(req.body)

try {
    const checkpass = await bcrypt.hash(password, 10)
    const usercheck = await Reg.findOne({username : username})
    if(usercheck == null){
        const record = new Reg ({username:username, email:email,password:checkpass})
        record.save()
        res.json({
            status : 201,
            apiData : record,
            message : "Registerd successfully"
        })
    }else{
        res.json({
            status : 409,
            message : "*User already exists"
        })
    }
} catch (error) {
    res.json({
        status : 500,
        message : "Something went wrong"
    })
}

}


exports.Login = async (req,res)=>{
    const {username,password} = req.body
    const record = await Reg.findOne({username : username})
 //    console.log(record)
 
 try{
 if(record!==null){
     const ismatched= await bcrypt.compare(password , record.password)
     // console.log(ismatched)
     if(ismatched){
     res.json({
         status : 200,
         apiData : record , 
         message : "Login Successfully"
 
     })
 }else{
     res.json({
         status : 400,
         message : "opps.. something went wrong"
     })
 
 }
 }else{
     res.json({
         status : 400,
         message : "opps.. something went wrong"
     })
 }
 }catch(error){
     res.json({
         status :404,
         message : error.message
     })
 }
 }

 exports.getallusers = async(req,res)=>{
   
    try {
        const record = await Reg.find()
        res.json({
            status : 200,
            apiData : record,
            message : "Successfully get all users"
        })
    } catch (error) {
        res.json({
            status:400,
            message: "Failed to get users"
        })
    }
 }