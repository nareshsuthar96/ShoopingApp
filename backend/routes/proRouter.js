const router= require("express").Router()
const Productc= require("../controller/productControllers")
const multer = require("multer")

const Storage = multer.diskStorage({
    destination : (req , file , cb)=>{
        cb(null, "./public/upload");
    },

    filename : function (req,file,cb){
        cb(null , Date.now()+file.originalname);
    }
})

let upload = multer({

    storage : Storage,
    limits : {
    fileSize : 1024*1024*4
    }
})

router.post("/adminproductinsertform",upload.single("pimg") , Productc.admininsertform)
router.get("/getallproduct" , Productc.getAllProduct)
router.delete("/adminproductdelete/:id" , Productc.AdmindeleteProduct)
router.get("/singleproductupdate/:id" , Productc.SingleProductUpdate)
router.put("/adminupdate/:id",Productc.adminfinalupdate)
router.put("/adminupdateImage/:id",upload.single("pimg"),Productc.adminfinalupdateImage)
router.get("/usershowproduct" , Productc.ShowUserProduct)




module.exports= router