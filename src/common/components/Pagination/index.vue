<template>
    <div class="pagination">

        <span class="pagination-info"
              v-if="showInfo">共{{ totalItems }}条
        </span>

        <button @click="goToPage(1)"
                :disabled="currentPage === 1"
                class="pagination-button hide-btn">
            首页
        </button>
        <button @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="pagination-button hide-btn">
            上一页
        </button>

        <template v-for="page in displayedPages"
                  :key="page">
            <button v-if="page === '...'"
                    class="pagination-ellipsis"
                    disabled>
                ...
            </button>
            <button v-else
                    @click="goToPage(page)"
                    :class="{ active: currentPage === page }"
                    class="pagination-button">
                {{ page }}
            </button>
        </template>

        <button @click="goToPage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="pagination-button hide-btn">
            下一页
        </button>
        <button @click="goToPage(totalPages)"
                :disabled="currentPage === totalPages"
                class="pagination-button hide-btn">
            尾页
        </button>
    </div>
</template>
  
  <script setup>
import { computed } from 'vue';

const props = defineProps({
    // 当前页码
    currentPage: {
        type: Number,
        required: true,
        default: 1
    },
    // 每页显示数量
    pageSize: {
        type: Number,
        required: true,
        default: 10
    },
    // 总数据量
    totalItems: {
        type: Number,
        required: true,
        default: 0
    },
    // 显示的最大页码按钮数（不包括首尾和上一页下一页）
    maxVisibleButtons: {
        type: Number,
        default: 4
    },
    // 是否显示分页信息
    showInfo: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['page-change']);

// 计算总页数
const totalPages = computed(() => {
    return Math.ceil(props.totalItems / props.pageSize);
});

// 计算显示的页码数组
const displayedPages = computed(() => {
    const pages = [];
    const half = Math.floor(props.maxVisibleButtons / 2);
    let start = Math.max(props.currentPage - half, 1);
    let end = Math.min(start + props.maxVisibleButtons - 1, totalPages.value);

    // 调整起始位置，确保显示maxVisibleButtons个按钮
    if (end - start + 1 < props.maxVisibleButtons) {
        start = Math.max(end - props.maxVisibleButtons + 1, 1);
    }

    // 添加第一页和可能的省略号
    if (start > 1) {
        pages.push(1);
        if (start > 2) {
            pages.push('...');
        }
    }

    // 添加中间页码
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    // 添加最后一页和可能的省略号
    if (end < totalPages.value) {
        if (end < totalPages.value - 1) {
            pages.push('...');
        }
        pages.push(totalPages.value);
    }

    return pages;
});

// 跳转到指定页码
const goToPage = (page) => {
    if (page === '...') return;

    const newPage = Math.max(1, Math.min(page, totalPages.value));
    if (newPage !== props.currentPage) {
        emit('page-change', newPage);
    }
};
  </script>
  
<style lang="scss" scoped>
.pagination {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 20px;
    flex-wrap: wrap;
    font-size: 14px;
    font-weight: 600;
}

.pagination-button {
    padding: 4px 8px;
    font-size: 14px;
    border: 1px solid #ddd;
    background-color: #fff;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s;
}

.pagination-button:hover:not(:disabled) {
    background-color: $theme-color;
}

.pagination-button:disabled {
    color: #7d7d7d;
    cursor: not-allowed;
}

.pagination-button.active {
    background-color: $theme-color;
    color: #ffffff;
    border-color: $theme-color;
}

.pagination-ellipsis {
    border: none;
    background: none;
    cursor: default;
    color: var(--text-color);
}

.pagination-info {
    color: var(--text-color);
}
/* 当屏幕宽度小于等于 600px 时应用的样式 */
@media only screen and (max-width: 670px) {
    .hide-btn {
        display: none;
    }
}
</style>