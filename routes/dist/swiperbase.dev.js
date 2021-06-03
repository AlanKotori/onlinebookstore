"use strict";

var express = require('express');

var router = express.Router();

var swiper = require('../model/swiper');

router.get('/', function (req, res) {
  swiper.find({}, function (error, data) {
    res.render('swiperbase', {
      data: data
    });
  });
});
router.post('/saveswiper', function (req, res) {
  // blog.create
  swiper.create({
    id: req.body.id,
    img_name: req.body.img_name,
    img_url: req.body.img_url
  }, function (error, data) {
    if (error) throw error; //  重定向

    res.redirect('/swiperbase');
  });
});
router.get('/swiperadd', function (req, res) {
  res.render('swiperadd', {
    title: '加入新内容'
  });
});
router.post('/del', function (req, res) {
  console.log(req.body);
  swiper.remove({
    _id: req.body.del
  }, function (error, data) {
    //  重定向
    //  重新请求了/bookbase
    res.redirect('/swiperbase');
  });
});
router.post('/update', function (req, res) {
  console.log(req.body);
  swiper.findOneAndUpdate({
    _id: req.body._id
  }, {
    $set: {
      id: req.body.id,
      img_name: req.body.img_name,
      img_url: req.body.img_url
    }
  }, {}, function (error, data) {
    //  重定向
    //  重新请求了/bookbase
    res.redirect('/swiperbase');
  });
});
module.exports = router;