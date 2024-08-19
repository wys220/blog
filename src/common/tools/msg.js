import { ElMessage } from 'element-plus';

//多个消息合并
let messageInstance = null;

const priority = {
    'error': 10000,
    'warning': 1000,
    'info': 100,
    'success': 10
}
const resetMessage = (options) => {
    options.duration = (options && options.duration) || 3000
    options.type = options.type || 'success'
    if (!messageInstance || priority[options.type] >= priority[messageInstance.type]) {
        messageInstance?.timer && clearTimeout(messageInstance.timer)
        messageInstance?.el?.close()
        messageInstance = {
            type: options.type,
            el: ElMessage(options),
            timer: setTimeout(() => {
                messageInstance = null
            }, options.duration)
        }
    }
};
['error', 'success', 'info', 'warning'].forEach(type => {
    resetMessage[type] = options => {
        if (typeof options === 'string') {
            options = {
                message: options
            }
        }
        options.type = type
        return resetMessage(options)
    }
})
export {
    resetMessage,
};

