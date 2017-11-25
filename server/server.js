const _ = require('lodash');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res)=>{
    var todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });  
});

app.get('/todos', (req, res) =>{

    Todo.find().then((todos)=>{
        res.send({todos});
    },(e) =>{
        res.status(400).send(e);
    });
})

// GET /todos/1234324
app.get('/todos/:id', (req, res) => {
    
    var id = req.params.id;
    // valid id using isValid
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
        // 404 send back empty body
    };

        // findById
    Todo.findById(id).then((todo)=>{
    // success
        // if no todo - send back 404 with empty body
        if(!todo){
            return res.status(404).send();
        }        
        // id todo - send it back
        res.send({todo});
    }).catch((e) => {
    // error
        res.status(400).send();
        //400 - send back empty body
    });


});

// DELETE /todos/1234324
app.delete('/todos/:id', (req, res) => {
    // get the id
    var id = req.params.id;
    // validate the id -> not valid? return 404
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
        // 404 send back empty body
    };

    // remove todo by id
    Todo.findByIdAndRemove(id).then((todo)=>{
    // success
        // if no todo -> send back 404 with empty body
        if(!todo){
            return res.status(404).send();
        }        
        // id todo - send it back with 200
        res.send({todo});
    }).catch((e) => {
    // error
        res.status(400).send();
        //400 - send back empty body
    });


});

// UPDATE /todos/123123
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    
    // validate the id -> not valid? return 404
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
        // 404 send back empty body
    };
    
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    };

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=>{
        if (!todo) {
            return res.status(40).send();
        };

        res.send({todo});
    }).catch((e=>{
        res.status(400).send();
    }));
});

app.listen(port, () => {
    console.log(`Started on PORT ${port}`);
})

module.exports = {app};