// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const users = { 
    users_list : [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }
 
const findUser = (name, job) => { 
    if (job != undefined){
        return users['users_list']
        .filter( (user) => user['name'] === name && user['job'] === job); 
    }
    return users['users_list']
        .filter( (user) => user['name'] === name); 
}

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined){
        let result = findUser(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else if (name != undefined){
        let result = findUser(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);
    
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

const checkInput = (user) => {
    // Make sure input is not empty string
    return user.name && user.job;
}
const addUser = (user) => {
    users['users_list'].push(user);
    return user;
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});

const findUserIndexById = (id) =>
    users['users_list']
        .findIndex( (user) => user['id'] === id);

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    let index = findUserIndexById(id)
    if (index === -1) {
        res.status(404).send('Resource not found.');
    } else { 
        users['users_list'].splice(index, 1);
        res.send();
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});    
