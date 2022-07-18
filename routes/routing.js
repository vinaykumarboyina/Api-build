const userApicalls=require("../controllers/userController")

const router=require("express").Router();

//userApicalls

router.post("/users/addUser",userApicalls.addUser)
router.get("/users/Users",userApicalls.getAllUsers)
router.get("/users/:id",userApicalls.getOneUser)
router.put("/users/:id",userApicalls.updateUser)
router.delete("/users/:id",userApicalls.deleteUser)


module.exports=router;