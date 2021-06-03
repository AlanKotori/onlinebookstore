"use strict";

var express = require('express');

var router = express.Router();

var cors = require('cors'); //  引入发送邮件的插件:nodemailer


var nodemailer = require('nodemailer'); // var redis = require('redis');
//  引入公共方法
// var math = require('../utils/math');
// //  引入redis
// var redis = require('redis');


var findcode = require('../model/code'); // //  链接redis数据库
// var client = redis.createClient(6379,'localhost');
// var client = redis.createClient(6379,'localhost');

/* GET home page. */


router.get('/code', cors(), function (req, res, next) {
  var transporter = nodemailer.createTransport({
    //  邮箱
    host: "smtp.office365.com",
    secureConnection: false,
    port: 587,
    //  是否安全的开启发送模式
    // secure:true,
    //  发送人:
    auth: {
      user: 'ur@alannico.fun',
      pass: 'corqhheonfslbstc'
    },
    tls: {
      ciphers: 'SSLv3'
    }
  });
  var getcode_random = Math.floor(Math.random() * 1000000000000 % 1000000);
  var nowtime = Date.now(); //  设置发送内容

  var mailOptions = {
    from: 'ur@alannico.fun',
    //  发送给谁
    to: req.query.email,
    //  cc 代表抄送给谁
    //  bcc 保密发送
    //  邮箱标题
    subject: '来自于网上书店毕业设计的验证码',
    //  邮件内容
    text: '验证码是:' + getcode_random + '。有效期5分钟'
  }; // 第三步，发送

  findcode.find({
    email: req.query.email
  }, function (error, data) {
    //  console.log(data[0]);
    //  console.log(req.query.email)
    // console.log(data[0].time);
    transporter.sendMail(mailOptions, function (error, data) {
      if (error) {
        console.log(error);
        res.send({
          status: 400,
          msg: '邮件发送失败'
        });
      } else {
        // console.log(data);
        findcode.remove({
          email: req.query.email
        }, function (error, data) {
          findcode.create({
            email: req.query.email,
            code: getcode_random,
            time: nowtime
          });
          res.send({
            msg: 'ok'
          });
        });
      }
    });
  });
});
module.exports = router;
/*
* 1. 核验用户是否注册过，邮箱，手机号码，用户昵称是否注册或者重复
*
* 2. 正则表达式细节方面，比如邮箱是否符合规范，用户名需要正则判断
*
* 3. 获取验证码，需要一个倒计时功能
*
* 4. 如果一个用户多次请求，设置一个服务器繁忙，请之后再次尝试
*
*
* */