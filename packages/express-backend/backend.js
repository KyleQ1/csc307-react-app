import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

function getUsers(name, job) {
    let promise;
    if (name === undefined && job === undefined) {
      promise = userModel.find();
    } else if (name && !job) {
      promise = findUserByName(name);
    } else if (job && !name) {
      promise = findUserByJob(job);
    } else {
        promise = findUserByNameAndJob(name, job);
    }
    return promise;
  }

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    getUsers(name, job)
        .then((users) => res.send({users_list: users}))
        .catch((error) => { 
            req.status(400).send("Bad request.");
            console.log(error); });
});

function findUserById(id) {
    return userModel.findById(id);
}
    
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    findUserById(id)
        .then((user) => user === undefined ? 
        res.status(404).send('Resource not found.') : res.send(user))
        .catch((error) => { 
            res.status(400).send("Bad request.")
            console.log(error); })
});

function addUser(user) {
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd)
        .then((user) => res.status(201).send(user))
        .catch((error) => 
        {res.status(400).send("Bad request.");
        console.log(error);});
});

function findByIdAndDelete(id) {
    return userModel.findByIdAndDelete(id);
}
app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    findByIdAndDelete(id)
        .then((user) => user === null ? 
        res.status(404).send('Resource not found.') : res.status(204).send())
        .catch((error) => {
            res.status(400).send("Bad request.");
            console.log(error);});
});

function findUserByName(name) {
    return userModel.find({ name: name });
}

function findUserByJob(job) {
    return userModel.find({ job: job });
}

function findUserByNameAndJob(name, job) {
    return userModel.find({name: name, job: job})
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});    
