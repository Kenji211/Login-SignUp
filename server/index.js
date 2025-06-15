const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require('./models/User')
const bcrypt = require('bcrypt');

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/test-project")

app.post('/login', async (req, res) => { //'/login'
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({username});
        if(!user){
            return res.json({ status: 'Error', message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.json({ status: 'Error', message: 'Incorrect password' });
        }

        res.json({ status: 'Success', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Login failed' });
    }

    // UserModel.findOne({username: username})
    // .then(user =>{
    //     if(user){
    //         if(user.password === password){
    //             res.json({ status: 'Success', user });
    //         }else{
    //             res.json('Password is incorrect')
    //         }
    //     }else{
    //         res.json('User is not registered')
    //     }
    // });
});


app.post('/register', async (req, res) => { // '/register'
    const { username, password, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword
        });

        res.json({ status: 'Success', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'Error', message: 'Registration failed' });
    }
})

app.get('/user/:id', (req, res) => {
    UserModel.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(500).json('User not found'));
});

app.listen(3001, () => {
    console.log('server is running')
})