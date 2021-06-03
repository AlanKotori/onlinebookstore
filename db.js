//      引入mongoose插件
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myblog');

//  触发连接成功事件
mongoose.connection.once('open',function(){
    console.log('CONNECT SUCCESS');
});


module.exports = mongoose;