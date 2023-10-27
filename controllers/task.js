import { json } from "express";
import {Task} from "../models/task.js"
import ErrorHandeler from "../middlewares/error.js";

export const newTask=async(req,res,next)=>{

    try{

        const {title,description} = req.body;
        await Task.create({
            title,
            description,
            user:req.user,
        });
        res.status(201).json({
            success:true,
            message:"Task added successfully",
        });
    }
    catch(error){

        next(error);

    }

};


export const getMyTask=async(req,res,next)=>{


    
    try{
    const userid=req.user._id;

    const tasks = await Task.find({user: userid});

    res.status(200).json({
        success:true,
        tasks,
    })

    }
    catch(error){

        next(error);
    }

}

//all the operation we have perfomed using postman such as login register delete get users these all are crud operations


export const updateTask=async(req,res,next)=>{

   try{
    const task = await Task.findById(req.params.id);

    if(!task) return next(new ErrorHandeler("Task not found", 404));

    task.isCompleted = !task.isCompleted;

    await task.save();



    res.status(200).json({
        success:true,
        message:"Task Updated!",
    })

   }
   catch(error){

    next(error);

   }

}


export const deleteTask=async(req,res,next)=>{

    try{

    const task = await Task.findById(req.params.id);
    if(!task) return next(new ErrorHandeler("Task not found", 404));

    await task.deleteOne();



    res.status(200).json({
        success:true,
        message:"Task Updated!",
    })
    }

    catch(error){
        next(error);
    }
}