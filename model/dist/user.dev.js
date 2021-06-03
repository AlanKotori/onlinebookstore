"use strict";

var Mail = require('nodemailer/lib/mailer'); //  引入userdb.js


var userdb = require('../userdb');

var Schema = userdb.Schema;
/*
    userid
    username  
    userwho   0,1,2
*/

var blogSchema = new Schema({
  userid: Number,
  usermail: String,
  userwho: Number,
  username: String,
  userpasswd: String,
  userwhere: String
});
module.exports = userdb.model('user', blogSchema, 'user');