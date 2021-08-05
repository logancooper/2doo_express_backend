const express = require("express");
const TaskModel = require("../models/TaskModel");

//create a router
const router = express.Router();

router.get("/", async(req,res)=>{
    const taskData = await TaskModel.getAllTaskData();
    res.json(taskData).status(200);
})

router.post("/add", async(req, res)=>{
    const {content} = req.body;
    const response = await TaskModel.addTask(content);
    console.log("Adding task with content: ", content);
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

//export router for use in the app
module.exports = router;