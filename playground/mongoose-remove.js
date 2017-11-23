const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({id: 5a15e1fdb8ca8d05587aeffb});

// Todo.remove({}).then((result)=>{
//     console.log(result);
// });

// Used when have to query by more than the id.
// Todo.findOneAndRemove({_id: '5a1731161b14c477dd085323'}).then((todo)=>{
//    console.log(todo);
// })

Todo.findByIdAndRemove('5a1731161b14c477dd085323').then((todo)=>{
    console.log(todo);
});