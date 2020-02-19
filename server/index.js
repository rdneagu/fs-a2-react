const express = require('express');
const api = require('./routes/api');

/* Prepare the body parser */
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* Pass the routes to the server to be used */
app.use('/api', api);

/* Start the server on port 5000 */
const port = 5000;
app.listen(port);

console.log(`App is listening on port: ${port}`); // eslint-disable-line no-console
