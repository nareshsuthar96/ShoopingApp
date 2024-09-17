const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require("cors")
mongoose.connect("mongodb://127.0.0.1:27017/MYECOMPRCT")
app.use(express.json())
app.use(cors())

app.use("/api" ,require("./routes/regRouter"))

app.use("/api" ,require("./routes/proRouter"))
app.use(express.static("public"))
app.listen(5000, ()=>{
    console.log("server is running on port 5000")
})