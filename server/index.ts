import express, { Request, Response } from 'express';
import path from 'path';
import chalk from 'chalk';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

const socket = new Server(server, {
	transports: ['websocket'],
});

socket.on('connect', (socket) => {
	socket.emit('deviceID', genDeviceID());

	const code = genCode();
	socket.emit('code', code);
	socket.join(code);
	socket.data.type = 'sender';

	socket.on('code', async (c: string) => {
		socket.data.type = 'receiver';
		socket.data.code = c;

		const allSockets = await socket.to(c).fetchSockets();
		if (allSockets.length <= 1) {
			socket.emit('error', 'No sender found');
			return;
		}

		socket.join(c);
	});

	socket.on('disconnect', () => {
		socket.leave(socket.data.code);

		// disconnect other socket
		socket.to(socket.data.code).emit('disconnect');
	});

	socket.on('text', async (data: string) => {
		const members = await socket.to(socket.data.code).fetchSockets();

		console.log(members);

		members
			.filter((s) => s.data.type == 'receiver')
			.forEach((s) => {
				s.emit('text', data);
			});
	});
});

// FILE SERVING
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

// API

// Routes
app.get('/', sendFile);
app.get('/app', sendFile);

app.get('/download/android', (req, res) => {
	res.redirect('https://github.com/sky-transfer/app/releases/latest');
});

app.get('*', notFound);

server.listen(3000, () => {
	console.log(chalk.green(`[SERVER]: Listening on port 3000`));
});

function sendFile(req: Request, res: Response) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
}

function notFound(req: Request, res: Response) {
	res.status(404).sendFile(path.join(__dirname, '../client/build/index.html'));
}

function genDeviceID() {
	let code = '';

	// include letters and numbers
	for (let i = 0; i < 16; i++) {
		code += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
	}
}

function genCode() {
	let code = '';
	for (let i = 0; i < 16; i++) {
		code += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
	}

	return code;
}
