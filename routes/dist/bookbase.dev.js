"use strict";

var express = require('express');

var router = express.Router();

var bookpage = require('../model/bookpage');

router.get('/', function (req, res) {
  bookpage.find({}, function (error, data) {
    res.render('bookbase', {
      data: data
    });
  });
});
router.post('/book', function (req, res) {
  console.log(req.body.id);
  var id = req.body.id;
  var userid = '';
  if (req.body.userid) userid = req.body.userid;
  bookpage.find({
    id: id
  }, function (error, data) {
    res.render('book', {
      data: data,
      title: id,
      userid: userid
    });
  });
});
router.get('/bookadd', function (req, res) {
  res.render('bookadd', {
    title: '加入新内容'
  });
});
router.post('/savebook', function (req, res) {
  // blog.create
  bookpage.create({
    id: req.body.id,
    book_picture: req.body.book_picture,
    bookname: req.body.bookname,
    author: req.body.author,
    price: req.body.price,
    newprice: req.body.newprice,
    weight: req.body.weight,
    publish: req.body.publish,
    book_isbn: req.body.book_isbn,
    edition: req.body.edition,
    "package": req.body["package"],
    format: req.body.format,
    publish_date: req.body.publish_date,
    number_page: req.body.number_page,
    book_features: req.body.book_features,
    book_edutorchoice: req.body.book_edutorchoice,
    book_introduction: req.body.book_introduction,
    book_author: req.body.book_author,
    book_review: req.body.book_review
  }, function (error, data) {
    if (error) throw error; //  重定向

    res.redirect('back');
  });
});
router.post('/del', function (req, res) {
  console.log(req.body);
  bookpage.remove({
    id: req.body.del
  }, function (error, data) {
    //  重定向
    //  重新请求了/bookbase
    res.redirect('/bookbase');
  });
});
router.post('/update', function (req, res) {
  // console.log(req.body);
  bookpage.remove({
    id: req.body.id
  }, function (error, data) {
    res.render('dataupdate', {
      id: req.body.id,
      book_picture: req.body.book_picture,
      bookname: req.body.bookname,
      author: req.body.author,
      price: req.body.price,
      newprice: req.body.newprice,
      weight: req.body.weight,
      publish: req.body.publish,
      book_isbn: req.body.book_isbn,
      edition: req.body.edition,
      "package": req.body["package"],
      format: req.body.format,
      publish_date: req.body.publish_date,
      number_page: req.body.number_page,
      book_features: req.body.book_features,
      book_edutorchoice: req.body.book_edutorchoice,
      book_introduction: req.body.book_introduction,
      book_author: req.body.book_author,
      book_review: req.body.book_review
    });
  });
});
module.exports = router;