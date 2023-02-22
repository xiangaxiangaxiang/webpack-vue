<template>
    <div>
        <p>Times clicked: {{ count }}</p>
        <button @click="increment">increment</button>
        <cxk />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Cxk from './cxk'

const count = ref(0)
const increment = () => count.value++
</script>