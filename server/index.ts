import express, { Request, Response } from 'express';
import path from 'path';
import chalk from 'chalk';
import mongoose from 'mongoose';
const app = express();
import { version } from './package.json';
import { access, readFile } from 'fs/promises';
import { constants } from 'fs';

// DATABASE
const MongoDBConfig: {
	ip: string;
	port: string;
	db: string;
	username: string;
	password: string;
} = {
	db: 'main',
	ip: '0.0.0.0',
	port: '27017',
	password: 'passwd',
	username: 'user',
};

mongoose
	.connect(
		`mongodb://${MongoDBConfig.username}:${MongoDBConfig.password}@${MongoDBConfig.ip}:${MongoDBConfig.port}`,
		{
			dbName: MongoDBConfig.db,
		},
	)
	.then(() => {
		console.log(chalk.blue('[DATABASE]: Connected!'));
	});

// FILE SERVING
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

// API

app.get('/api/version', (req, res) => {
	if (req.query.json !== undefined) res.json(version);
	else res.send(version);
});

// Routes
app.get('/', sendFile);
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
