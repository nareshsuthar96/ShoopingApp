const mongoose = require("mongoose")

const productSchema = mongoose.Schema({

    PTitle : {type : String , required : true},
    PDesc : {type : String , required : true},
    PPrice : {type : Number , required : true},
    PQuantity : {type : Number , required : true},
    PImage : {type : String , required:true},
    PStatus : {type : String, default : "IN-STOCK" }

})


module.exports = mongoose.model("products" , productSchema)