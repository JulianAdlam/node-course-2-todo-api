//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
//(E6 destructuring) creates a variable called MongoClient and sets it to the MongoClient property of the require('MongoDB')


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDb server.')
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err){
    //         return console.log('Unable to insert Todo.', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    //insert new doc into Users(name, age, location)
    // db.collection('Users').insertOne({
    //     name: 'Julian Adlam',
    //     age: 47,
    //     location: 'Stourport-on-Severn'
    // }, (err, result) => {
    //     if (err){
    //         return console.log('Unable to insert User.', err);
    //     }

    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    // });

    db.close();
});