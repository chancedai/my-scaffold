// 一、js 引入 
// 不合并，只引用，返回原生的 Promise; webpackChunkName 用于生成引用文件名称[name];注意要使用 default
import(/* webpackChunkName: 'a' */'../../common/js/a').then( ({ default: a }) => {
    a();
});

// 合并
import b from '../../common/js/b';
b();


// 二、css 引入，css 可依赖 js 来引入，所以要异步引入 css，引入它的父 js 即可，如 b.css.js
import '../../common/css/a.css';

// 三、图片字体等资源依赖 css 或 js中的 html

setTimeout(function(){
    document.body.innerHTML = '<div class="test">click me!</div>';
    var node = document.querySelector('.test');
    node.addEventListener('click',function(){
        import(/* webpackChunkName: 'bcss' */'../../common/js/bcss').then(({default:bcss})=>{
            bcss();
        });
    });
},1e3);