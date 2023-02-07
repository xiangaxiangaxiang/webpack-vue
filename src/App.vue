<template>
    <div class="container">
        <p>{{count}}</p>
        <p>{{double}}</p>
        <button @click="addOne">button</button>
    </div>
    <test-tsx main-title="test tsx" />
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
import TestTsx from './components/test'

const count = ref(0)
const double = computed(() => count.value*2)
const addOne = () => count.value++
</script>

<style lang="less">
.container {
    width: 500px;
    height: 200px;
    justify-content: center;
    align-items: center;
    p, button {
        width: 200px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin-bottom: 10px;
    }
}
</style>