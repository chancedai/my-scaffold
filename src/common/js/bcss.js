import '../css/b.css';
import bjpg from '../img/b.jpg';

export default function b(){
    const node = document.querySelector('.test');
        node.innerHTML = '<p><img width="50" src="'+bjpg+'"/><br/>我是点击后加载进来的内容：）</p>'
}