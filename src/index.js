const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const connection = mysql.createConnection({
	hits: 'localhost',
	user: 'root',
	password: 'nGlwwzfu4d5pdH2a',
	database: 'todo_js_api'
});

try {
	connection.connect();
}
catch(e) {
	console.log('Database connection failed');
	console.log(e);
}

const api = express();
api.use(express.static(__dirname + '/public'));
api.use(bodyParser.json());
// api.use((req, res, next) => {
// 	console.log('Hello');
// 	next();
// });

api.listen(3000, () => {
	console.log('App running');
});

api.get('/tasks', (req, res) => {
	connection.query('SELECT * FROM tasks ORDER BY created DESC', (error, results) => {
		if (error) return res.json({ error: error }); // CHANGE FOR PRODUCTION!

		res.json(results);
	});
});

api.post('/add', (req, res) => {
	console.log(req.body);
	connection.query('INSERT INTO tasks (description) VALUES (?)', [req.body.item], (error, results) => {
		if (error) return res.json({ error: error }); // CHANGE FOR PRODUCTION!
		
		connection.query('SELECT LAST_INSERT_ID() FROM tasks', (error, results) => {
		// console.log(results[0]['LAST_INSERT_ID()']);
			if (error) return res.json({ error: error }); // CHANGE FOR PRODUCTION!
			
			res.json ({
				id: results[0]['LAST_INSERT_ID()'],
				description: req.body.item
			});
		});
	});
});

// api.get('/', (req, res) => {
// 	res.send('Hello!');
// });