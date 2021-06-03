"use strict";

var express = require('express');

var router = express.Router();

var blog = require('../model/blogs');
/* GET home page. */


router.get('/', function (req, res) {
  blog.find({}, function (error, data) {
    res.render('database', {
      data: data
    });
  });
});
router.get('/dataadd', function (req, res) {
  res.render('dataadd', {
    title: '加入新内容'
  });
});
router.post('/saveblog', function (req, res) {
  // blog.create
  blog.create({
    id: req.body.id,
    title: req.body.title,
    create_date: req.body.create_date,
    last_date: req.body.last_date,
    content: req.body.content,
    visitor: req.body.visitor,
    tag: req.body.tag
  }, function (error, data) {
    if (error) throw error; //  重定向

    res.redirect('/database');
  });
});
router.post('/del', function (req, res) {
  console.log(req.body);
  blog.remove({
    title: req.body.del
  }, function (error, data) {
    //  重定向
    //  重新请求了/database
    res.redirect('/database');
  });
});
router.post('/update', function (req, res) {
  // console.log(req.body);
  blog.remove({
    id: req.body.id
  }, function (error, data) {
    res.render('dataupdate', {
      id: req.body.id,
      title: req.body.title,
      create_date: req.body.create_date,
      last_date: req.body.last_date,
      content: req.body.content,
      visitor: req.body.visitor,
      tag: req.body.tag
    });
  });
});
module.exports = router;