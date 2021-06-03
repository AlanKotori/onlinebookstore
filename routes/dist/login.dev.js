"use strict";

/**
 * 登录子应用
 */
var express = require('express');

var User = require('../model/user');

var log = require('../middleware/log'); // 文章子应用


var loginApp = express(); // 加载登录页

loginApp.get('/', function (req, res) {
  res.render('login', {
    msg: ''
  });
}); // 实现登录操作

loginApp.post('/', function (req, res, next) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;
  User.login(username, password).then(function (result) {
    if (result) {
      req.log = {
        time: new Date(),
        handle: '登录',
        ip: req.ip.split(':')[3]
      };
      log.add(req, res, next); // session存储（key=value）

      req.session.user = result;
      res.redirect('/');
    } else {
      res.render('login', {
        msg: '登录失败！用户名或密码错误'
      });
    }
  })["catch"](function (err) {
    next(err);
  });
});
module.exports = loginApp;