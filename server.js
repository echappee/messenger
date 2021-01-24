
const express = require('express')
const app = express()
const port = 3001

const { Sequelize, Op, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:', {
    logging: console.log
});

class User extends Model { }
User.init({
    username: DataTypes.STRING,
    password: DataTypes.VIRTUAL
}, {
    sequelize,
    modelName: 'User'
});
console.log(User === sequelize.models.User);
// This creates the table if it doesn't exist (and does nothing if it already exists)

try {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.')
        User.sync()
    }


    );
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


// const users = ['laure', 'jp', 'marie'];
// app.get('/users', (req, res) => {
//     res.send({ users: users })
// })

app.post('/user', (req, res) => {
    users.push(req.body.name)
    console.log(req.body)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})