import express, { Request, Response } from 'express';
import path from 'path';
import chalk from 'chalk';
const app = express();

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

app.listen(3000, () => {
	console.log(chalk.green(`[SERVER]: Listening on port 3000`));
});

function sendFile(req: Request, res: Response) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
}

function notFound(req: Request, res: Response) {
	res.status(404).sendFile(path.join(__dirname, '../client/build/index.html'));
}

function genCode() {
	let code = '';
	for (let i = 0; i < 16; i++) {
		code += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
	}

	return code;
}
