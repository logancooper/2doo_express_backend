const express = require("express");
const TaskModel = require("../models/TaskModel");

//create a router
const router = express.Router();

router.get("/", async(req,res)=>{
    const taskData = await TaskModel.getAllTaskData();
    res.json(taskData).status(200);
})

router.post("/add", async(req, res)=>{
    const {content, dueDate, hasDueDate} = req.body;
    console.log("Express says hasDueDate is: " + hasDueDate);
    let response;
    if(hasDueDate)
    {
        const convertedDueDate = new Date(dueDate);
        response = await TaskModel.addTask(content, convertedDueDate.getTime(), hasDueDate);
        console.log("Adding task with content: " + content + " and Due Date: " + convertedDueDate.getTime());
    }
    else
    {
        response = await TaskModel.addTask(content, dueDate, hasDueDate);
        console.log("Adding task with content: " + content + " and no due date");
    }

    
    //Check response from DB
    res.status(200).send(response);
    
})

router.post("/delete", async(req, res)=>{
    const {taskID} = req.body;
    const response = await TaskModel.deleteTask(taskID);
    console.log("Deleting task with ID: ", taskID);

    res.status(200).send(response);
})

router.post("/toggle-task-completed", async(req, res)=>{
    const {taskID} = req.body;
    const response = await TaskModel.toggleTaskCompleted(taskID);
    console.log("Completing task with ID: ", taskID);

    res.status(200).send(response);
})

router.post("/toggle-task-favorited", async(req, res)=>{
    const {taskID} = req.body;
    const response = await TaskModel.toggleTaskFavorited(taskID);
    console.log("Favoriting task with ID: ", taskID);

    res.status(200).send(response);
})

//export router for use in the app
module.exports = router;