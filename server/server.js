require('dotenv').config();
var express = require('express');
// var awsController = require('./awsController');
var massive = require('massive');
var bodyParser = require('body-parser');
// var userController = require('./userController');
// var Auth0Strategy = require('passport-auth0');
var session = require('express-session');
var passport = require('passport');
var cors = require('cors');
// var stripe = require('stripe')('sk_test_LkNfgMLBoBD50f69BBQYPnni')
// var config = require('./config')
var app = module.exports = express();
var port = 8080;

app.use(cors());

app.use(session({
  resave: true, //Without this you get a constant warning about default values
  saveUninitialized: true, //Without this you get a constant warning about default values
  secret: 'asdjfa;klsdjfladsfjkadfs;lkj'
}))
app.use( express.static( `${__dirname}/../build` ) );
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

const connectionString = process.env.CONNECTION_STRING;
massive( connectionString ).then( db => {
  console.log("DB Connected");
  app.set('db', db)
  // db.initTables.initTables()
  // .then( response => {
  //   console.log('User table init'); })
}).catch(err=>console.log(err));