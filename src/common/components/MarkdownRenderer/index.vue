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
        <div v-if="content"
             class="markdown-renderer">
            <div class="preview-container">
                <div class="markdown-preview"
                     v-html="renderedMarkdown"></div>
            </div>
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

import { giteeApi } from '@c/api/giteeApi';


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
    showLineNumbers: {
        type: Boolean,
        default: true,
    },
    showCopyButton: {
        type: Boolean,
        default: true,
    },
})

const { proxy } = getCurrentInstance();

const content = ref('')
const loading = ref(false)
const error = ref('')

// 全局仅配置一次marked
marked.setOptions({
    highlight: function (code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
    },
    breaks: true,
    gfm: true
});

// 配置marked解析器
const renderedMarkdown = computed(() => {
    const rawHtml = content.value ? marked.parse(content.value) : '';
    const sanitizedHtml = DOMPurify.sanitize(rawHtml);
    return addLineNumbersAndCopyButtons(sanitizedHtml);
});

// 初始化：全局事件委托（解决动态按钮点击无效问题）
// 放在组件挂载时执行（如onMounted钩子），仅执行一次
function initCopyEventDelegate() {
    // 监听整个文档的点击事件，委托给复制按钮
    document.addEventListener('click', (e) => {
        const copyButton = e.target.closest('.copy-button');
        if (!copyButton) return; // 不是复制按钮则退出

        // 获取代码块ID并执行复制逻辑
        const codeId = copyButton.dataset.codeId;
        const codeElement = document.getElementById(codeId);
        if (!codeElement) return;

        copyToClipboard(codeElement.textContent, copyButton);
    });
}

// 复制逻辑抽离：单独函数，便于维护和复用
function copyToClipboard(text, button) {
    // 处理剪贴板API异常
    navigator.clipboard.writeText(text)
        .then(() => {
            const originalHtml = button.innerHTML;
            const language = button.dataset.language; // 从data属性获取语言，避免DOM查询
            // 显示复制成功状态
            button.innerHTML = `<i class="fas fa-check"></i>${language} 复制成功`;
            button.classList.add('copied');
            // 2秒后恢复原状态
            setTimeout(() => {
                button.innerHTML = originalHtml;
                button.classList.remove('copied');
            }, 2000);
        })
        .catch((err) => {
            console.error('复制失败：', err);
        });
}
// 为代码块添加行号和复制按钮
function addLineNumbersAndCopyButtons(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // 1. 处理超链接：所有<a>标签添加target="_blank"和安全rel属性
    const links = tempDiv.querySelectorAll('a');
    links.forEach(link => {
        // 仅对外部链接或非本页锚点生效（可根据需求调整）
        const isExternal = !link.href.startsWith(window.location.origin);
        if (isExternal || !link.hash) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // 2. 处理代码块（行号 + 复制按钮）
    const codeBlocks = tempDiv.querySelectorAll('pre code');
    codeBlocks.forEach((codeBlock, index) => {
        const pre = codeBlock.parentElement;
        // 提取语言类型（如"language-js" → "js"）
        const language = codeBlock.className.match(/language-(\w+)/)?.[1] || 'code';
        const codeContent = codeBlock.textContent;
        // 生成唯一ID（避免重复）
        const uniqueCodeId = `code-block-${Date.now()}-${index}`;

        // 创建行号容器
        const lineNumbers = document.createElement('div');
        lineNumbers.className = 'line-numbers';
        // 根据代码行数生成行号（排除最后一个空行）
        const lineCount = codeContent.split('\n').length;
        for (let i = 1; i <= lineCount - 1; i++) {
            const line = document.createElement('div');
            line.textContent = i;
            lineNumbers.appendChild(line);
        }

        // 创建复制按钮（存储唯一ID和语言）
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = `<i class="fas fa-copy"></i>${language} 复制代码`;
        copyButton.dataset.codeId = uniqueCodeId;
        copyButton.dataset.language = language;

        // 创建代码块主容器
        const codeContainer = document.createElement('div');
        codeContainer.className = 'code-container';

        // 重组DOM结构
        codeBlock.id = uniqueCodeId; // 给代码块设唯一ID
        pre.className = 'code-pre'; // 给pre加类名便于样式控制
        pre.parentNode.replaceChild(codeContainer, pre);
        codeContainer.appendChild(copyButton);
        codeContainer.appendChild(lineNumbers);
        codeContainer.appendChild(pre);
    });

    return tempDiv.innerHTML;
}

// 获取 Markdown 内容
const fetchMarkdown = async () => {
    loading.value = true
    error.value = ''
    try {
        const res = await giteeApi.getMarkdownFile(props.rawUrl)
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

// 监听 rawUrl 变化
watch(() => props.rawUrl, fetchMarkdown)

// 初始化时加载
onMounted(() => {
    fetchMarkdown()
    initCopyEventDelegate();
})
</script>
  
<style lang="scss">
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
.markdown-renderer {
    box-sizing: border-box;
    background: #f1f1f1;
}

.markdown-preview {
    overflow-y: auto;
    box-sizing: border-box;
    background: #f1f1f1;
    padding: 10px;
}

/* 代码块样式 */
.code-container {
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    margin: 16px 0;
    display: flex;
}

pre {
    position: relative;
    padding: 35px 8px 10px 8px;
    overflow-x: auto;
    background-color: #2d2d2d;
    color: #ccc;
    font-family: "Consolas", "Monaco", monospace;
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
    width: 100%;
}

code {
    background-color: transparent !important;
    padding: 0 !important;
    font-size: 15px !important;
}

/* 行号样式 */
.line-numbers {
    height: 100%;
    padding: 35px 8px 10px 8px;
    background-color: #3a3a3a;
    color: #ccccc2;
    font-family: "Consolas", "Monaco", monospace;
    font-size: 15px;
    line-height: 1.5;
    text-align: right;
    user-select: none;
    box-sizing: border-box;
}

/* 复制按钮样式 */
.copy-button {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 4px 8px;
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: all 0.2s;
    z-index: 99;
}

.copy-button:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.copy-button.copied {
    background-color: #4caf50;
}

.copy-button i {
    font-size: 12px;
}

/* Markdown 基础样式 */
.markdown-preview h1,
.markdown-preview h2,
.markdown-preview h3,
.markdown-preview h4,
.markdown-preview h5,
.markdown-preview h6 {
    margin-top: 1em;
    margin-bottom: 0.5em;
    font-weight: 600;
}

.markdown-preview p {
    margin: 1em 0;
    line-height: 1.6;
}

.markdown-preview ul,
.markdown-preview ol {
    margin: 1em 0;
    padding-left: 2em;
}

.markdown-preview ul {
    list-style-type: disc;
}

.markdown-preview ol {
    list-style-type: decimal;
}

.markdown-preview li {
    margin: 0.5em 0;
}

.markdown-preview a {
    color: #2196f3;
    text-decoration: none;
}

.markdown-preview a:hover {
    text-decoration: underline;
}

.markdown-preview blockquote {
    border-left: 4px solid #ddd;
    padding-left: 1em;
    margin: 1em 0;
    color: #666;
}

.markdown-preview table {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0;
}

.markdown-preview th,
.markdown-preview td {
    border: 1px solid #e1e1e1;
    padding: 5px 9px;
    text-align: left;
}

.markdown-preview th {
    background-color: #e6e6e6;
}
</style>
