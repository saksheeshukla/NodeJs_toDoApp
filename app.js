import express from "express";
import userRouter from "./routes/user.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
export const app=express(); 
//install the dotenv package

config({
    path:"./data/config.env",
});

//This is model view controller(MVC)

//using middlewares
app.use(express.json());

app.use(cookieParser());

app.use(cors({
    //we will pass the domains here and if there is random domain request it will be blocked
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    //for cookies etc
    credentials:true,
}))

//using routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);

app.get("/",(req,res)=>{
    res.send("Nice Working");
});
 

//This is our error handler
//we are using error handler so in case of the error postman shows invalid message error or in terminal "nice" so it doesnot end up crashing the whole side
//using error middle ware
app.use(errorMiddleware);