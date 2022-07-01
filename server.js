const socketPort = 7000;
const express = require('express');
const app = express();
const server = require("http").createServer(app);
const {
	Server
} = require("socket.io");
const io = new Server().listen(server);
// const io = new Server(server);
// const socket = require("socket.io");
// const io = socket.listen(server);


app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	try {
		// console.log('a user connected');
		socket.on('send-chat', (data) => {
			// console.log(`SOCKET DATA => ${data.msg}`);
			io.emit('send-chat', {
				msg: data.msg,
				from: data.from
			});
		});

		// socket.on('disconnect', () => {
		// 	console.log('user disconnected');
		// });
	} catch (socketError) {
		console.log("production exception: " + new Date() + ":", socketError);
	}
});

server.listen(socketPort, () => {
	console.log(`Socket.IO server running at http://localhost:${socketPort}/`);
});