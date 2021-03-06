const expect=require('expect');
const request=require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {ObjectID} = require('mongodb');



const todos = [{
    _id: new ObjectID(),
    text: 'Put water in the kettle.'
},{
    _id: new ObjectID(),
    text: 'Turn on and boil the kettle'
}];

beforeEach ((done)=>{
    Todo.remove({}).then(()=>{
        Todo.insertMany(todos);
    }).then(()=>done());
});


describe('POST /todos', ()=>{
    it('should create a new todo', (done)=>{
        var text = 'Test todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err, res) =>{
            if(err){
                return done(err);
            }

            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();

            }).catch((e)=> done(e));
        });
    });

    it('should not create todo with invalid body data', (done)=>{
        var text = '';
        
                request(app)
                .post('/todos')
                .send({text})
                .expect(400)
                .end((err, res) =>{
                    if(err){
                        return done(err);
                    }
        
                    Todo.find().then((todos)=>{
                        expect(todos.length).toBe(2);
                        done();
        
                    }).catch((e)=> done(e));
                });
            });
});

describe('GET /todos', () => {
    it ('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    })
});


describe('GET /todos/:id', ()=>{
    it('should return todo doc', (done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should retrun a 404 if todo not found', (done)=>{
        request(app)
        .get(`/todos/${ new ObjectID().toHexString()}`)
        .expect(404)
        .end(done);
    });

    
    it('should retrun a 404 for non-object Ids', (done)=>{
        request(app)
        .get(`/todos/123321145`)
        .expect(404)
        .end(done);
    });
});

describe('DELETE /todos/:id', ()=>{
    var hexId = todos[1]._id.toHexString();
    it('Should delete todo doc', (done)=>{
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) =>{
            if(err){
                return done(err);
            }

            Todo.findById(hexId).then((todos)=>{
                expect(todos).toNotExist();
                done();

            }).catch((e)=> done(e));
        });
    });

    var hexID = new ObjectID().toHexString();
    it('should return a 404 if doc not found', (done)=>{
        request(app)
        .delete(`/todos/${hexID}`)
        .expect(404)
        .end(done);
    });

    it('should return a 404 for non-object IDs', (done)=>{
        request(app)
        .delete('/todos/1234')
        .expect(404)
        .end(done);
    });
});