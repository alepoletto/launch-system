const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chalk = require('chalk')
const log = console.log

const app = express();

// basic security configuration
const helmet = require('helmet')
app.use(helmet())


// for Heroku deployment
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});


app.use(bodyParser.json());
app.use(cors());

//services
require('./service/storageService');
require('./routes/launch')(app);

if (['production'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  log(chalk.blue.bgRed.bold('Server is up on PORT: '), PORT);
});
