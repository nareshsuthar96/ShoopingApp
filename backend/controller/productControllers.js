
const Product = require("../model/products")

exports.admininsertform =  (req,res)=>{
    // console.log(req.body)
    // console.log(req.file)


  

    const {pname,pdesc, pprice , pqty ,pstatus}= req.body
    const filename = req.file.filename

    try{
    const record = new Product({ PTitle : pname, PDesc:pdesc,PPrice:pprice,PQuantity:pqty,PStatus:pstatus,PImage:filename})
    record.save()
    res.json({
        status : 201,
        apiData : record,
        message : "Your Product is SuccessFully Inserted"
    })
    }catch(error){
        res.json({
            status : 400,
            message : error.message
        })
    }
}

exports.getAllProduct = async(req,res)=>{
    try {
        const record = await Product.find()
        res.json({
            status : 201,
            apiData : record,
            message : "Product Successfully received"
        })
    } catch (error) {
        res.json({
            status : 400,
            message : error
        })
    }
}

exports.AdmindeleteProduct = async(req,res)=>{
    const id = req.params.id
    try {
        await Product.findByIdAndDelete(id)
        res.json({
            status : 200,
            message : "successfully Delete"
        })
    } catch (error) {
        res.json({
            status : 400,
            message : error.message
        })
        
    }
}


exports.SingleProductUpdate = async(req,res)=>{
    const id = req.params.id
    try {
        const data = await Product.findById(id)
        // console.log(data)
        res.json({
            status : 200,
            apiData : data,
            message : "Successfully Get Product"
        })
    } catch (error) {
        res.json({
            status : 400,
            message : error.message
        })
    }
}


exports.adminfinalupdate = async(req,res)=>{
    console.log(req.body)
    const id = req.params.id
    const {pname , pdesc , pprice , pqty , pstatus} = req.body
    // console.log(req.file.filename)
    try{
        await Product.findByIdAndUpdate( id, {PTitle  : pname ,  PDesc : pdesc ,  PPrice : pprice ,PQuantity : pqty ,  PStatus  : pstatus })
        res.json({
            status : 200 , 
            message : "successfully Product Updated"
        })
    }catch(error){
        res.json({
            status : 400 , 
            message: error.message
        })
    }
       
    
  
}

exports.adminfinalupdateImage = async(req,res)=>{
    const id = req.params.id
    const {pname , pdesc , pprice , pqty , pstatus} = req.body
     const filename = req.file.filename
    console.log(req.file.filename)
    try{
        
        await Product.findByIdAndUpdate( id ,{PTitle  : pname ,  PDesc : pdesc ,  PPrice : pprice , PQuantity : pqty ,  PStatus  : pstatus , PImage : filename })
       
        res.json({
            status : 200 , 
            message : "successfully Product Updated"
        })
    }catch(error){
        res.json({
            status : 400 , 
            message: error.message
        })
    }
       
    
  
}

exports.ShowUserProduct = async(req,res)=>{
    try{
        const record =  await Product.find({PStatus :"IN-STOCK"})
        res.json({
            status : 200 , 
            apiData : record , 
            message : "Represent successfully"
        })
        }catch(error){
                res.json({
                    status : 400 , 
                    message : error.message
                })
        }
}
