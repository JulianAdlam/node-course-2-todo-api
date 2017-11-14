const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5a0a6f79c2fc6df033e77aba1';
var id = '5a08a90d0d96accc3e8d5ea8';

if (!ObjectID.isValid(id)){
    return console.log('Id is invalid');
};

User.findById(id).then((user) => {
    if(!user){
      return console.log('User not found');
    }
    console.log(user);
}).catch((e)=>{
    console.log(e);
});

// if(!ObjectID.isValid(id)){
//     console.log('Id not Valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found.')
//     }
//     console.log('Todo By Id', todo);
// }).catch((e) => {
//     console.log(e);
// });

//Users
// Get an _id
// lod user mongoose
// User.findById
// not found
//found
// error handles