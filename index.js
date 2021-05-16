const express = require('express')
const app = express();
const bodyparser = require("body-parser");
const fs = require('fs');


//using the ejs template engine
app.set('view engine',   'ejs');

 //adding body-parser
app.use(bodyparser.urlencoded({ extended: true }));
const task = [];
const editTasked= [];
const  complete = [];


//render css using using express




// INDEX ROUTE
app.get('/', function(req, res){
    res.render('index',{
        task:task, 
        complete:complete
    })
 });
 //EDIT TASK
app.get('/edittask', function(req, res){
    res.render('edittask',{
        editTasked:editTasked
    })
 });

//submitting a post to addtask

//  app.post('/addtask', function (req, res) {
//     res.render('index')
//  });

 //DISPLAY A LIST OF TASK AND ADDED BY USER

 // ADD TASK

app.post('/addtask', function (req, res) {
 
const newTask = req.body.newtask;

if(newTask === ""){
    res.redirect('./not-found');
}  
else{
    task.push(newTask);

}
   res.redirect('/');
 });



 //EDIT TASK
app.post('/edittask', function (req, res) {
    const editTask = req.body.check;
    editTasked.pop();
    if((task.indexOf(editTask) !== -1) && (typeof editTask ==="string")) {
        editTasked.push(editTask)
        task.splice(task.indexOf(editTask),1);
        res.redirect("/edittask");

    }
    else {
        res.redirect("/");

    }
 });

 //FOR COMPLETE
 
app.post("/removetask", function(req, res) {
     var completeTask = req.body.check;
if (typeof completeTask === "string") {
     complete.push(completeTask);
  task.splice(task.indexOf(completeTask), 1);
  } else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {     complete.push(completeTask[i]);
    task.splice(task.indexOf(completeTask[i]), 1);
}
}
   res.redirect("/");
});

app.use(express.static("public"));

app.listen(8080, function () {
    console.log('Running on port 8080!')
  });


