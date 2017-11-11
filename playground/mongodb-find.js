//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
//(E6 destructuring) creates a variable called MongoClient and sets it to the MongoClient property of the require('MongoDB')


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDb server.')
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').find({
    //     _id: ObjectID('5a07692a940c2f6a1d1b7bbc')
    // }).toArray()
    // .then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err) => {
    //         return console.log('Unable to retrieve document.', err);
    // });

    db.collection('Users').find({name: 'Trish Adlam'}).count()
    .then((count) => {
        console.log(`Users Count: ${count}`);
    },(err) => {
        return console.log('Unable to retrieve document.', err);
    });


    //db.close();
});