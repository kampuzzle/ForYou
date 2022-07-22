const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

const routes = require('./routes/routes');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true}));
app.use('/',routes)

app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});