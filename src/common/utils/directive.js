//指令
import { isJSON } from '@c/tools/fn';
import { resetMessage } from '@c/tools/msg.js';
//-------元素里面的input框聚焦------------
const focus = {
    mounted(el) {
        let item;
        if (el.tagName != 'INPUT') {
            item = el.querySelector('input');
        } else {
            item = el;
        }
        item.focus();
    }
}

//-----点击除自己本身的元素外的空白处触发事件---------
/**
 * 传入一个函数
 */
const clickoutside = {
    // 初始化指令
    beforeMount(el, binding, vnode) {
        function documentHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {
                return false;
            }
            // 判断指令中是否绑定了函数
            if (typeof binding.value == 'function') {
                // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                binding.value(e);
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    unmounted(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    },
}

//-----------复制元素------------------
/**
 * 传入要复制的内容
 */
const copy = {
    mounted(el, { value }) {
        el.$value = value

        // el控件定义 onclick 事件
        el.onclick = () => {
            if (!el.$value) {
                console.log('无复制内容')
                return
            }
            // 动态创建 textarea 标签
            const textarea = document.createElement('textarea')
            // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
            textarea.readOnly = 'readonly'
            textarea.style.position = 'absolute'
            textarea.style.left = '-9999px'
            // 将要 copy 的值赋给 textarea 标签的 value 属性
            if (isJSON(el.$value) || typeof el.$value == 'object') {
                textarea.value = JSON.stringify(el.$value);
            } else {
                textarea.value = el.$value;
            }
            // 将 textarea 插入到 body 中
            document.body.appendChild(textarea)
            // 选中值并复制
            textarea.select()
            const result = document.execCommand('Copy')
            if (result) {
                // console.log('复制成功')
                resetMessage({
                    type: 'success',
                    message: '复制成功',
                })
            }
            document.body.removeChild(textarea)
        }
        // 绑定点击事件，就是所谓的一键 copy 啦
        el.addEventListener('click', el.handler)
    },
    // 当传进来的值更新的时候触发
    beforeUpdate(el, { value }) {
        el.$value = value
    },
    // 指令与元素解绑的时候，移除事件绑定
    unmounted(el) {
        el.removeEventListener('click', el.handler)
    },
}
const drag = {
    mounted: function (el, binding) {
        el.style.cursor = 'move';
        el.style.position = 'absolute';
        el.onmousedown = function (e) {
            let disX = e.pageX - el.offsetLeft;
            let disY = e.pageY - el.offsetTop;

            if (binding.value === 'father') {
                disX = e.pageX - el.parentNode.offsetLeft;
                disY = e.pageY - el.parentNode.offsetTop;
            } else {
                disX = e.pageX - el.offsetLeft;
                disY = e.pageY - el.offsetTop;
            }

            document.onmousemove = function (e) {
                let x = e.pageX - disX;
                let y = e.pageY - disY;
                let maxX;
                let maxY;

                if (binding.value === 'father') {
                    maxX =
                        el.parentNode.parentNode.offsetWidth - el.parentNode.offsetWidth;
                    maxY =
                        el.parentNode.parentNode.offsetHeight - el.parentNode.offsetHeight;
                } else {
                    maxX = el.parentNode.offsetWidth - el.offsetWidth;
                    maxY = el.parentNode.offsetHeight - el.offsetHeight;
                }

                if (x < 0) {
                    x = 0;
                } else if (x > maxX) {
                    x = maxX;
                }

                if (y < 0) {
                    y = 0;
                } else if (y > maxY) {
                    y = maxY;
                }

                if (binding.value === 'father') {
                    el.parentNode.style.left = x + 'px';
                    el.parentNode.style.top = y + 'px';
                } else {
                    el.style.left = x + 'px';
                    el.style.top = y + 'px';
                }
            };
            document.onmouseup = function () {
                document.onmousemove = document.onmouseup = null;
            };
        };
    },
}
export default {
    focus,
    clickoutside,
    copy,
    drag,
}