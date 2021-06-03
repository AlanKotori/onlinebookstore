//  声明一个对象，向外暴露

var math = {}

//  随机数函数
math.random = function(){
    var str = '';
    for(let i = 0 ; i < 6 ; i ++){
        var  a = Math.floor((Math.random()*1000000)) % 10;
        str += a;
    }
    return str;
}

module.exports = math;