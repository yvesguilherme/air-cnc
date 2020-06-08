const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

// Drive Node.js Version 2.2.12
// mongodb://omnistack:omnistack@omnistack-shard-00-00-3nedm.mongodb.net:27017,omnistack-shard-00-01-3nedm.mongodb.net:27017,omnistack-shard-00-02-3nedm.mongodb.net:27017/semana09?ssl=true&replicaSet=OmniStack-shard-0&authSource=semana09&retryWrites=true&w=majority

// Drive Node.js Version 3.0
mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-3nedm.mongodb.net/semana09?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Para produção, utilizar o Redis
const connectedUsers = {};

io.on('connection', socket => {
	// console.log(socket.handshake.query);
	// console.log('Usuário conectado', socket.id);

	const { user_id } = socket.handshake.query;
	connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
	req.io = io;
	req.connectedUsers = connectedUsers;

	// Se não colocar o next, a aplicação não sai deste método.
	return next();
});

// Informar para o express utilizar formato JSON
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);