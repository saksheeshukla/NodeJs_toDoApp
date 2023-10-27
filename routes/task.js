import express from "express";
import { deleteTask, getMyTask, newTask, updateTask } from "../controllers/task.js";
import {isAuthenticated} from "../middlewares/auth.js"
const router = express.Router();

router.post("/new",isAuthenticated,newTask);

//to get all the task
router.get("/my",isAuthenticated,getMyTask)

//dynamic url
router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);



export default router;