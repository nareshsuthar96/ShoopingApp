const router = require("express").Router()
const regc = require("../controller/regController")


router.post("/signup" , regc.Register)

router.post("/Login" , regc.Login)

router.get("/getusers" , regc.getallusers)






module.exports = router