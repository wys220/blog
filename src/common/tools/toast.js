/**
 * 全局提示指示器
 * @param {*} options 
 * 
// 提示选项
options {
  message: '',// 提示的消息
  type: '', //类型 'success' | 'error' | 'warning' | 'info'
  duration: null // 显示时长(ms)，0表示不会自动关闭
  position:'',//提示弹框位置 'top' | 'center' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  showClose: false, // 是否显示关闭按钮
  onClose: () => void // 关闭时的回调
}
 * @returns 
 */
// 显示提示
export const showToast = (options) => {
    // 处理字符串参数
    if (typeof options === 'string') {
        options = { message: options }
    }

    const id = generateId()
    const element = createToastElement(options, id)

    // 存储选项数据
    element.dataset.toastOptions = JSON.stringify(options)

    // 设置自动关闭
    let timer = null
    const duration = options.duration ?? 3000
    if (duration > 0) {
        timer = window.setTimeout(() => {
            closeToast(id)
        }, duration)
    }

    // 注册关闭按钮事件
    if (options.showClose) {
        const closeBtn = element.querySelector('.toast-close')
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeToast(id))
        }
    }

    // 存储实例
    const toastInstance = { id, element, timer }
    toastInstances.push(toastInstance)

    return id
}

// 提示实例管理
let toastInstances = []
let toastCount = 0

// 创建唯一ID
const generateId = () => {
    toastCount++
    return `toast-${Date.now()}-${toastCount}`
}

// 获取类型对应的样式类和图标
const getTypeConfig = (type) => {
    const configs = {
        success: {
            className: 'toast-success',
            icon: '✓'
        },
        error: {
            className: 'toast-error',
            icon: '✕'
        },
        warning: {
            className: 'toast-warning',
            icon: '!'
        },
        info: {
            className: 'toast-info',
            icon: 'i'
        }
    }
    return configs[type]
}

// 创建提示元素
const createToastElement = (options, id) => {
    const type = options.type || 'info'
    const { className, icon } = getTypeConfig(type)
    const position = options.position || 'top'

    // 创建容器
    const toast = document.createElement('div')
    toast.id = id
    toast.className = `vue-toast ${className} position-${position}`
    toast.style.zIndex = '9999'

    // 设置样式
    const style = document.createElement('style')
    style.textContent = `
      .vue-toast {
        position: fixed;
        padding: 12px 16px;
        border-radius: 4px;
        color: #fff;
        font-size: 14px;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transform: translateY(-10px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        max-width: 300px;
        word-break: break-word;
      }
      
      .vue-toast.show {
        opacity: 1;
        transform: translateY(0);
      }
      
      .vue-toast.toast-success {
        background-color: #4CAF50;
      }
      
      .vue-toast.toast-error {
        background-color: #F44336;
      }
      
      .vue-toast.toast-warning {
        background-color: #FF9800;
      }
      
      .vue-toast.toast-info {
        background-color: #2196F3;
      }
      
      .vue-toast .toast-icon {
        font-weight: bold;
      }
      
      .vue-toast .toast-close {
        margin-left: 8px;
        cursor: pointer;
        font-size: 16px;
      }
      
      .vue-toast.position-top {
        top: 20px;
        left: 50%;
        transform: translate(-50%, -10px);
      }
      
      .vue-toast.position-top.show {
        transform: translate(-50%, 0);
      }
      
      .vue-toast.position-center {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.9);
      }
      
      .vue-toast.position-center.show {
        transform: translate(-50%, -50%) scale(1);
      }
      
      .vue-toast.position-bottom {
        bottom: 20px;
        left: 50%;
        transform: translate(-50%, 10px);
      }
      
      .vue-toast.position-bottom.show {
        transform: translate(-50%, 0);
      }
      
      .vue-toast.position-top-left {
        top: 20px;
        left: 20px;
      }
      
      .vue-toast.position-top-right {
        top: 20px;
        right: 20px;
      }
      
      .vue-toast.position-bottom-left {
        bottom: 20px;
        left: 20px;
      }
      
      .vue-toast.position-bottom-right {
        bottom: 20px;
        right: 20px;
      }
    `
    document.head.appendChild(style)

    // 构建内容
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${options.message}</span>
      ${options.showClose ? '<span class="toast-close">×</span>' : ''}
    `

    // 添加到文档
    document.body.appendChild(toast)

    // 触发动画
    setTimeout(() => {
        toast.classList.add('show')
    }, 10)

    return toast
}

// 关闭提示
export const closeToast = (id) => {
    const index = toastInstances.findIndex(instance => instance.id === id)
    if (index === -1) return

    const instance = toastInstances[index]
    const { element, timer } = instance

    // 清除计时器
    if (timer) {
        clearTimeout(timer)
    }

    // 移除动画
    element.classList.remove('show')

    // 移除元素
    setTimeout(() => {
        if (element.parentNode) {
            element.parentNode.removeChild(element)
        }

        // 调用回调
        const toastOption = element.dataset.toastOptions ? JSON.parse(element.dataset.toastOptions) : {}
        if (typeof toastOption.onClose === 'function') {
            toastOption.onClose()
        }

        // 从实例列表中移除
        toastInstances.splice(index, 1)
    }, 300)
}

// 快捷方法
export const toast = {
    success: (message, options = {}) =>
        showToast({ ...options, message, type: 'success' }),

    error: (message, options = {}) =>
        showToast({ ...options, message, type: 'error' }),

    warning: (message, options = {}) =>
        showToast({ ...options, message, type: 'warning' }),

    info: (message, options = {}) =>
        showToast({ ...options, message, type: 'info' }),

    close: (id) => closeToast(id),

    closeAll: () => {
        toastInstances.forEach(instance => closeToast(instance.id))
    }
}

// 全局注册
export const install = (app) => {
    // 注册为全局属性
    app.config.globalProperties.$toast = toast
}

export default { install, toast, showToast }
