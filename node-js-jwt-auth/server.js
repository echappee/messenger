const bodyParser = require("body-parser");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom, getUsers } = require('./users');

// socket io
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//------------

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const { message } = require("./app/models");
const Message = db.message
// console.log(Message)
const Role = db.role;

db.sequelize.sync({ alter: true }).then(() => {
    initial();
});

function initial() {
    //upsert=update/insert
    Role.upsert({
        id: 1,
        name: "user"
    });

    Role.upsert({
        id: 2,
        name: "moderator"
    });

    Role.upsert({
        id: 3,
        name: "admin"
    });
}

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to messenger application." });
});

const User = db.user
//------------------------------
//Websocket
// Run when client connects
io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const defaultRoom = 'general';

        //Recuperer l'id de l utilisateur dans la BDD
        User.findOne({
            where: {
                username: name
            }
        }).then(({ id }) => {
            const { error, user } = addUser({ id, name, room: defaultRoom });

            if (error) return callback(error);


            socket.join(user.room);
            //emit message to a single user
            socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
            //emit to everyone
            socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

            // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

            //emit users
            socket.emit('users', { users: getUsers() });


            // update the list of users for everyone
            socket.broadcast.to(user.room).emit('users', { users: getUsers() });

            //historique de la conversation avec la methode findAll pour récupérer tous les messages
            Message.findAll().then((messages) => {
                socket.emit('messages', messages);
                // console.log(messages);
            });

            callback();
        })
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });
        // console.log(user.name)
        Message.create({
            username: user.name,
            text: message
        })
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
            socket.broadcast.to(user.room).emit('users', { users: getUsers() });
        }
    })
});


http.listen(8080, () => {
    console.log('listening on *:8080');
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);