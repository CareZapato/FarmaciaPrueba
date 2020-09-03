const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
	origin: 'http://localhost:8080'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to Drugstore API application.' });
});

// set port, listen for requests
const PORT = process.env.PORT || 8081;

require('./app/routes/drugstore.routes.js')(app);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
