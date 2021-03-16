const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const List = require('./models/list');

app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/', function(req,res){

    List.find({}, function(err, tasks){
        if(err){
            console.log('Error in fetching contact');
            return;
        }
        for(let i of tasks){
            i.dateString = (i.date.toISOString());
        }
        return res.render('home', {
            title: "ToDo List",
            todolist: tasks
        });
    });
    
});

app.post('/create-item', function(req, res){

    List.create({
        task: req.body.task,
        category: req.body.category,
        date: req.body.date
    }, function(err, newTask){
        if(err){
            console.log("Error in creating a contact.");
            return ;
        }
        console.log('*******', newTask);
        return res.redirect('back');
    });

});

app.get('/delete-items', function(req, res){

    let id = req.query.todelete;
    let allIds = new Array();
    if(typeof(id)=="string"){
        allIds.push(id);
    }
    else{
        allIds = id;
    }
    console.log(allIds);
    for(let i of allIds){
        List.findByIdAndDelete(i, function(err){
            if(err){
                console.log('Error in deleting object');
                return;
            }
        });
    }
    return res.redirect('back');

});

app.listen(port, function(err){
    if(err){
        console.log('Error', err);
    }
    console.log('Server running on port:', port);
});