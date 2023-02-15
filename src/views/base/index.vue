<template>
    <div class="container">
        <p>{{ count }}</p>
        <p>{{ double }}</p>
        <el-button @click="addOne">button</el-button>
        <test-tsx main-title="test tsx" />
        <p class="test-ellipsis ellipsis">
            hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
        </p>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import TestTsx from 'src/components/test'

const count = ref(0)
const double = computed(() => count.value * 2)
const addOne = () => count.value++
</script>

<style lang="less">
.container {
    width: 500px;
    height: 200px;
    justify-content: center;
    align-items: center;

    p,
    button {
        width: 200px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin-bottom: 10px;
    }

    .test-ellipsis {
        max-width: 30px;
    }
}
</style>