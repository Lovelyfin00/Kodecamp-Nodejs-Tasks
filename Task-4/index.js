const express = require("express");
const logger = require("morgan");
const uuid = require("uuid");

const server = express();

server.use(express.json());

//middleware for files
server.use(express.urlencoded({extended: false}));

server.use(logger("dev"))

let taskList = [];

//add a new task
server.post("/addNewTask", (req, res) => {
    const taskId = uuid.v4();
    const taskContent = req.body;
    console.log(taskContent);
    const newTask = {
        id: taskId,
        ...taskContent
    }

    console.log(taskList);
    taskList.push(newTask);

    res.send({
        status: true,
        message: "Task added successfully",
        data: taskList
    });
})

//get list of all the task
server.get("/getAllTasks", (req, res) => {
    res.send({
        status: true,
        message: "List of all tasks retrieved successfully",
        data: taskList
    });
})

//get list of task by id
server.get("/getSingleTask/:id", (req, res) => {
    const taskId = req.params.id;

    const requestedTask = taskList.find(tasks => tasks.id === taskId);

    res.send({
        status: true,
        message: "Task retrieved successfully",
        data: requestedTask
    });
})

//Update body and title of a task
server.put("/updateTaskTitleAndBody/:id", (req, res) => {
    const taskId = req.params.id;
    const {title, body} = req.body;

    taskList.map(task => {
        if(taskList.length !== 0 && task.id === taskId){
            task.body = body;
            task.title = title
        }
    })

    const responseObj = taskList.length !== 0 ? {
        status: true,
        message: "Task title and body updated successfully",
        data: taskList
    } : {
        status: false,
        message: "You have not added any task",
        data: taskList
    }

    res.send(responseObj);
})

//Update status a task
server.patch("/updateTaskStatus/:id", (req, res) => {
    const taskId = req.params.id;
    const {status} = req.body;

    taskList.map(task => {
        if(taskList.length !== 0 && task.id === taskId){
            task.status = status;
        }
    })

    const responseObj = taskList.length !== 0 ? {
        status: true,
        message: "Task status updated successfully",
        data: taskList
    } : {
        status: false,
        message: "You have not added any task",
        data: taskList
    }

    res.send(responseObj);
})

//delete a task
server.delete("/deleteATask/:id", (req, res) => {
    const taskId = req.params.id;

    taskList = taskList.filter(task => task.id !== taskId);

    const responseObj = taskList.length !== 0 ? {
        status: true,
        message: "Task deleted successfully",
        data: taskList
    } : {
        status: false,
        message: "You have not added any task",
        data: taskList
    }

    res.send(responseObj);
})

server.listen(3000, function(){
    console.log("Server is up");
})