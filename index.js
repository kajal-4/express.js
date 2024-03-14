// import
const express=require("express");
const morgan=require("morgan");
// initialization
const app=express();
app.use(morgan('dev'));
app.use(express.json());
// in memory storage is task
let tasks=[];
// route to get all task
app.get('/',(req,res)=>{
    res.json(tasks);
})
// route to create a new task
app.post('/tasks',(req,res)=>{
    tasks.push(req.body);
    res.send({message:"task added",tasks})
})
// route to get a taskby id
app.get('/tasks/:id',(req,res)=>{
    const id=req.params.id;

    const task=tasks.find(task=>task.id==id)
    if(!task){
        res.send("task not found");
    }else{
        res.json(task)
    }
    
});
// update
app.put('/tasks/:id',(req,res)=>{
    const id=req.params.id;
    const updatedTask=req.body;
    const index=tasks.findIndex((task)=>task.id===id);
    if(index===-1){
        res.send("Task not found")
    }else{
        tasks.splice(index,1,updatedTask);
        // tasks[index]=updated task
        res.json(tasks)
    }
})
// delete
app.delete('/tasks/:id',(req,res)=>{
    const id=req.params.id;
    const updatedTask=req.body;
    const index=tasks.findIndex((task)=>task.id===id);
    if(index===-1){
        res.send("Task not found")
    }else{
        tasks.splice(index,1);
        // tasks[index]=updated task
        res.json(tasks)
    }
})


// route
app.listen(8200,(req,res)=>{
    console.log("port is up")
})