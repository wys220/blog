<template>
    <div class="typewriter-effect">
        <span>{{ displayedText }}</span>
        <span class="cursor">|</span>
    </div>
</template>
  
  <script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
    props: {
        text: {
            type: String,
            required: true
        },
        typingSpeed: {
            type: Number,
            default: 100 // 打字速度（毫秒）
        },
        deletingSpeed: {
            type: Number,
            default: 50 // 删除速度（毫秒）
        },
        pauseDuration: {
            type: Number,
            default: 2000 // 打字完成后暂停时间（毫秒）
        },
        loop: {
            type: Boolean,
            default: false // 是否循环
        }
    },
    setup(props) {
        const displayedText = ref('');
        let timer = null;
        let isDeleting = false;
        let charIndex = 0;

        const type = () => {
            if (isDeleting) {
                // 删除字符
                displayedText.value = props.text.substring(0, displayedText.value.length - 1);
                charIndex--;

                if (displayedText.value === '') {
                    isDeleting = false;
                    if (props.loop) {
                        // 如果是循环模式，重新开始打字
                        setTimeout(type, props.typingSpeed);
                    }
                } else {
                    timer = setTimeout(type, props.deletingSpeed);
                }
            } else {
                // 打字模式
                displayedText.value = props.text.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === props.text.length) {
                    // 打字完成，暂停后开始删除
                    isDeleting = true;
                    timer = setTimeout(type, props.pauseDuration);
                } else {
                    timer = setTimeout(type, props.typingSpeed);
                }
            }
        };

        onMounted(() => {
            timer = setTimeout(type, props.typingSpeed);
        });

        onUnmounted(() => {
            clearTimeout(timer);
        });

        return {
            displayedText
        };
    }
};
  </script>
  
<style scoped>
.typewriter-effect {
    font-family: "仓耳渔阳体 W02";
}

.cursor {
    animation: blink 1s infinite;
}

@keyframes blink {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
}
</style>