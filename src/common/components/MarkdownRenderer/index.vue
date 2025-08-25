<template>
    <div class="markdown-viewer">
        <div class="flex-s font16"
             v-if="blogInfo?.author ||  blogInfo?.date">
            <div class="margin-r15"
                 v-if="blogInfo?.author">
                <g-icons iconName="icon-zuozhe"
                         size="18">
                </g-icons>
                作者：{{ blogInfo?.author }}
            </div>
            <div v-if="blogInfo?.date">
                <g-icons iconName="icon-riqi"
                         size="18">
                </g-icons>
                日期：{{ blogInfo?.date }}
            </div>
        </div>
        <div class="markdown-body"
             v-if="content">
            <div v-html="renderedContent"></div>
        </div>
        <div v-else-if="loading"
             class="loading-container">
            <div class="loading-spinner"></div>
            <span>加载中...</span>
        </div>
        <div v-else
             class="error-message"
             v-text="error || '暂无内容'"></div>
    </div>
</template>
  
<script setup>
import { ref, computed, onMounted, watch, onUnmounted, getCurrentInstance } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css';
import Clipboard from 'clipboard'
import { getBlogMdDetailsAPI } from '@c/api/gitee'


const props = defineProps({
    blogInfo: {
        type: Object,
        default: () => { }
    },
    // Gitee raw 文件 URL
    rawUrl: {
        type: String,
        required: true
    },
})

const { proxy } = getCurrentInstance();

const content = ref('')
const loading = ref(false)
const error = ref('')


// 渲染后的内容
const renderedContent = computed(() => {
    if (!content.value) return ''
    // 使用 DOMPurify 清理 HTML 防止 XSS
    return DOMPurify.sanitize(renderMarkdown(content.value))
})

/**
* 使用 marked 解析 Markdown
* @param markdown 解析的文本
*/
const renderMarkdown = (markdown) => {
    const renderer = new marked.Renderer()
    // 自定义代码块的渲染逻辑
    renderer.code = ({ text, lang, escaped }) => {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        const highlighted = hljs.highlight(text, { language }).value

        // 生成唯一标识
        const codeIndex = parseInt(Date.now() + '') + Math.floor(Math.random() * 10000000)

        // 添加复制按钮
        const copyButton = `
                    <div class="codeblockheader">
                    <div>${language}</div>
                    <div id="copy-btn" data-clipboard-action="copy" data-clipboard-target="#copy${codeIndex}">复制</div>
                    </div>
                `

        // 生成代码块和隐藏的 textarea 用于复制
        return `${copyButton}
                <pre class="hljs">
                <code>${highlighted}</code>
                </pre>
                <textarea style="position: absolute; top: -9999px; left: -9999px; z-index: -9999;" id="copy${codeIndex}">${text.replace(
            /<\/textarea>/g,
            '&lt;/textarea>'
        )}
        </textarea>`
    }

    return marked(markdown, { renderer })
}

// 获取 Markdown 内容
const fetchMarkdown = async () => {
    loading.value = true
    error.value = ''
    try {
        const res = await getBlogMdDetailsAPI(props.rawUrl)
        content.value = res
        // console.log(content.value, '获取 Markdown 内容');
    } catch (err) {
        error.value = err.message
        content.value = ''
        console.error('Error fetching markdown:', err)
    } finally {
        loading.value = false
    }
}


const clipboard = new Clipboard('#copy-btn')
// 复制成功失败的提示
clipboard.on('success', (e) => {
    console.log('复制成功')
    proxy.$toast.success('复制成功')
})
clipboard.on('error', (e) => {
    console.log('复制失败')
    clipboard.destroy()
})
// 监听 rawUrl 变化
watch(() => props.rawUrl, fetchMarkdown)

// 初始化时加载
onMounted(fetchMarkdown)
onUnmounted(() => {
    // 清理事件监听器
    if (window.clipboardInitialized) {
        window.clipboardInitialized = false
        // 假设 clipboard 实例可以被全局访问
        clipboard.destroy()
    }
})
</script>
  
<style scoped>
.markdown-viewer {
    background: #f1f1f1;
    padding: 10px;
    border-radius: 4px;
    color: #3f3f3f;
}
.loading-container {
    padding: 40px;
    text-align: center;
    color: #3f3f3f;
}

.loading-spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #0366d6;
    animation: spin 1s ease-in-out infinite;
    margin-right: 8px;
    vertical-align: middle;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.error-message {
    padding: 16px;
    color: #cb2431;
    background-color: #ffebeb;
    border-radius: 0 0 6px 6px;
}
</style>
<style>
.codeblockheader {
    display: flex;
    justify-content: space-between;
    line-height: 20px;
    padding: 8px 10px;
    background: #282c34;
    border-radius: 5px 5px 0 0;
    color: #fff;
    cursor: pointer;
    font-size: 15px;
    border-bottom: 1px solid #666666;
}
/* 可以添加一些自定义样式 */
.markdown-body {
    line-height: 1.6;
}

/* 确保代码块有适当的边距和样式 */
.markdown-body pre {
    margin: 0; /* 移除默认的外边距 */
    padding: 5px 10px; /* 移除默认的内边距 */
    overflow-x: auto; /* 确保长代码可以滚动 */
    white-space: pre-wrap; /* 保留换行但允许自动换行 */
    word-wrap: break-word; /* 允许长单词换行 */
    background-color: #282c34;
    border-radius: 0 0 4px 4px;
}

.markdown-body code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    background-color: #1b1f230d;
    border-radius: 3px;
}

.markdown-body pre code {
    padding: 0;
    background-color: transparent;
}
.markdown-body table {
    width: 100%;
    border-collapse: collapse;
    /* 让表格边框合并 */
    box-shadow: 2px 2px 10px #00000033;
    /* 添加表格阴影 */
    margin: 10px 0;
}

.markdown-body th,
.markdown-body td {
    border: 1px solid #ddd;
    /* 添加边框 */
    padding: 8px;
    text-align: left;
    background-color: #f4f4f4;
}

.markdown-body th {
    background-color: #ededed;
    /* 表头背景色 */
    font-weight: bold;
}
</style>