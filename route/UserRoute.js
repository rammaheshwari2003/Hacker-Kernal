const express=require("express");
const route=express.Router();

const UserController=require("../controller/UserController");

route.get("/home", UserController.Home);
route.get("/adduser", UserController.UserAdd);
route.get("/createtask", UserController.TaskCreate);
route.get("/display", UserController.Display);
route.post("/add", UserController.UserCreate);
route.post("/addtask", UserController.TaskAdd);
route.get("/download", UserController.Download);




module.exports=route;