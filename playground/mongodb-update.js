//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
//(E6 destructuring) creates a variable called MongoClient and sets it to the MongoClient property of the require('MongoDB')


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDb server.')
    }
    console.log('Connected to MongoDB server');

    // findOneAndUpdate ObjectId("5a077242940c2f6a1d1b7dcf")

    // db.collection('Todos').findOneAndUpdate(
    //     { _id: new ObjectID('5a077242940c2f6a1d1b7dcf') }, 
    //     { $set: { completed: true }},
    //     { returnOriginal: false }
    // ).then((result)=>{
    //     console.log(result);
    // });

    //ObjectId("5a0774f8940c2f6a1d1b7f30")
    db.collection('Users').findOneAndUpdate(
        { _id: new ObjectID('5a0774f8940c2f6a1d1b7f30') },
        { $set: { name: 'Ian Adlam' },
          $inc: { age: -5 }},
        { returnOriginal: false}
    ).then((result) => {
        console.log(result);
    });


    //db.close();
});