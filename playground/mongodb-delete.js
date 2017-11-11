//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
//(E6 destructuring) creates a variable called MongoClient and sets it to the MongoClient property of the require('MongoDB')


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDb server.')
    }
    console.log('Connected to MongoDB server');

    //deleteMany
    // db.collection('Users').deleteMany({name: 'Julian Adlam'}).then((result)=>{
    //     console.log(result);
    // })

    //deleteOne
    // db.collection('Users').deleteOne({_id: 1233}).then((result)=>{
    //     console.log(result)
    // })

    // findOneAndDelete
    db.collection('Users').findOneAndDelete({_id: new ObjectID("5a071e780ca4a72f9cf3369f")}).then((results)=>{
        console.log(JSON.stringify(results, undefined, 2));
    });

    //db.close();
});