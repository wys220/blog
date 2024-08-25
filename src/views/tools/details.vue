<!-- 工具页详情 -->
<template>
    <g-detail>
        <component :is="currentComponent"></component>
    </g-detail>
</template>
<script>
import DrawRectangle from "./components/DrawRectangle"
import MathsCompute from "./components/MathsCompute"
import Signature from "./components/Signature"

export default {
    components: {
        DrawRectangle,
        MathsCompute,
        Signature
    }
}

</script>

<script setup>
import { ref, getCurrentInstance, onMounted } from "vue";
import { useRoute } from "vue-router";

const { proxy } = getCurrentInstance();
const route = useRoute()

const currentComponent = ref('')

onMounted(() => {
    currentComponent.value = route.params?.type || 'DrawRectangle'
})

</script>

<style lang="scss" scoped>
</style>