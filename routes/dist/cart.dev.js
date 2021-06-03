"use strict";

var _require = require('express'),
    request = _require.request;

var express = require('express');

var router = express.Router();

var bookpage = require('../model/bookpage');

var buying = require('../model/buying');

var buyback = require('../model/buyback');

var buybackhistory = require('../model/buybackhistory');

var buysend = require('../model/buysend');

var user = require('../model/user');

var bookpage = require('../model/bookpage');

var cart = require('../model/cart');

router.get('/', function (req, res) {
  cart.find({}, function (error, data) {
    res.render('cartbase', {
      data: data
    });
  });
});
router.post('/addcart', function (req, res) {
  // blog.create
  var userid = req.body.userid;
  var cartid = Math.ceil(Math.random() * 10000000);
  cart.create({
    userid: req.body.userid,
    bookname: req.body.bookname,
    book_id: req.body.bookid,
    buy_money: req.body.buy_money,
    cartid: cartid
  }, function (error, data8) {
    if (error) throw error; //  重定向

    user.find({
      userid: userid
    }, function (error, user) {
      bookpage.find({}, function (error, bookpage) {
        buysend.find({
          userid: userid
        }, function (error, buysend) {
          buying.find({
            userid: userid
          }, function (error, buying) {
            buyback.find({
              userid: userid
            }, function (error, buyback) {
              var totelmoney = 0;
              var totelbuymoney = 0;
              var totelbackmoney = 0;

              for (var i = 0; i < buysend.length; i++) {
                totelmoney = buysend[i].buy_money + totelmoney;
              }

              for (var _i = 0; _i < buying.length; _i++) {
                totelbuymoney = buying[_i].buy_money + totelbuymoney;
              }

              for (var _i2 = 0; _i2 < buyback.length; _i2++) {
                totelbackmoney = buyback[_i2].buy_money + totelbackmoney;
              }

              cart.find({
                userid: userid
              }, function (error, cart) {
                res.render('loginsuccess', {
                  title: '网上书店',
                  cart: cart,
                  totelmoney: totelmoney,
                  user: user,
                  bookpage: bookpage,
                  buysend: buysend,
                  totelbuymoney: totelbuymoney,
                  totelbackmoney: totelbackmoney
                });
              });
            });
          });
        });
      });
    });
  });
});
router.post('/delcart', function (req, res) {
  cart.remove({
    _id: req.body.del
  }, function (error, data8) {
    var userid = req.body.userid;
    if (error) throw error; //  重定向

    bookpage.find({}, function (error, bookpage) {
      user.find({
        userid: userid
      }, function (error, user) {
        buysend.find({
          userid: userid
        }, function (error, buysend) {
          buying.find({
            userid: userid
          }, function (error, buying) {
            buyback.find({
              userid: userid
            }, function (error, buyback) {
              buybackhistory.find({
                userid: userid
              }, function (error, buybackhistory) {
                var totelmoney = 0;
                var totelbuymoney = 0;
                var totelbackmoney = 0;

                for (var i = 0; i < buysend.length; i++) {
                  totelmoney = buysend[i].buy_money + totelmoney;
                }

                for (var _i3 = 0; _i3 < buying.length; _i3++) {
                  totelbuymoney = buying[_i3].buy_money + totelbuymoney;
                }

                for (var _i4 = 0; _i4 < buyback.length; _i4++) {
                  totelbackmoney = buyback[_i4].buy_money + totelbackmoney;
                }

                cart.find({
                  userid: userid
                }, function (error, cart) {
                  res.render('loginsuccess', {
                    title: '网上书店',
                    cart: cart,
                    totelmoney: totelmoney,
                    user: user,
                    bookpage: bookpage,
                    buysend: buysend,
                    totelbuymoney: totelbuymoney,
                    totelbackmoney: totelbackmoney,
                    buybackhistory: buybackhistory
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
router.post('/delcartfrommybook', function (req, res) {
  cart.remove({
    _id: req.body.del
  }, function (error, data8) {
    var userid = req.body.userid;
    if (error) throw error; //  重定向

    buying.find({
      userid: userid
    }, function (error, buying) {
      buyback.find({
        userid: userid
      }, function (error, buyback) {
        buybackhistory.find({
          userid: userid
        }, function (error, buybackhistory) {
          buysend.find({
            userid: userid
          }, function (error, buysend) {
            cart.find({
              userid: userid
            }, function (error, cart) {
              user.find({
                userid: userid
              }, function (error, user) {
                res.render('mybook', {
                  buying: buying,
                  title: '我的订单管理',
                  buyback: buyback,
                  buysend: buysend,
                  userid: userid,
                  cart: cart,
                  user: user,
                  buybackhistory: buybackhistory
                });
              });
            });
          });
        });
      });
    });
  });
});
module.exports = router;