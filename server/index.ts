import express, { Request, Response } from 'express';
import path from 'path';
import chalk from 'chalk';
import { createServer } from 'http';
import { Server } from 'socket.io';

if (process.env.SELF_HOSTED)
	console.log(chalk.yellow('[SERVER]: Welcome to Sky Transfer self hosted!'));

const app = express();
const server = createServer(app);

const socket = new Server(server, {
	transports: ['websocket'],
});

let sockets: Record<string, string> = {};

socket.on('connect', (socket) => {
	socket.emit('deviceID', genDeviceID());

	const code = genCode();
	socket.emit('code', code);
	socket.join(code);
	socket.data.type = 'sender';

	sockets[socket.id] = code;

	socket.on('code', async (c: string) => {
		// check which room the socket is in
		// if (socket.data.code) return;

		const allSockets = await socket.in(c).fetchSockets();
		if (allSockets.length < 1) {
			socket.emit('error', 'No sender found');
			return;
		}

		socket.data.type = 'receiver';
		socket.data.code = c;

		sockets[socket.id] = c;

		socket.join(c);

		allSockets.forEach((s) => {
			s.emit('type', s.data.type);
		});

		socket.emit('type', socket.data.type);
	});

	socket.on('disconnect', () => {
		const code = sockets[socket.id];
		if (!code) return;

		socket.to(code).emit('end-disconnected');

		delete sockets[socket.id];
	});

	socket.on('text', async (data: string) => {
		if (socket.data.type != 'sender') return;

		const code = [...socket.rooms.values()].find((r) => r != socket.id);
		if (!code) return;

		const members = await socket.in(code).fetchSockets();

		members
			.filter((s) => s.data.type == 'receiver')
			.forEach((s) => {
				s.emit('text', data);
			});
	});
});

// FILE SERVING
if (!process.env.SELF_HOSTED)
	app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
if (!process.env.SELF_HOSTED)
	app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

// ^ frontend is not required when self hosting; skipping file serving in this case

// API

// Routes
if (!process.env.SELF_HOSTED) {
	app.get('/', sendFile);

	app.get('/app', sendFile);

	app.get('/download/android', (req, res) => {
		res.redirect('https://github.com/sky-transfer/app/releases/latest');
	});

	app.get('*', notFound);
} else app.get('*', (_, res) => res.redirect('https://st.r07.dev/app'));

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
