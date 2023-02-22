<template>
    <div>
        {{ msg }}
    </div>
</template>

<script setup lang="ts">
import {toRefs} from 'vue'
const props = defineProps<{msg: string}>()
const {msg} = toRefs(props)
</script>