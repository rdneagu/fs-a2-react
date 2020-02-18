const express = require('express');
const bodyParser = require('body-parser');

/* Prepare the body parser */
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Start the server on port 5000 */
const port = 5000;
app.listen(port);

console.log(`App is listening on port: ${port}`); // eslint-disable-line no-console
