<template>
    <div class="pinia-demo">
        <input type="text" @input="setUserName">
        <p>用户名：{{ username }}</p>
        <p>用户名倒转：{{reverse}}</p>     
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from 'src/pinia/user-store'

const store = useUserStore()
const {username, reverse} = storeToRefs(store)
const setUserName = (e: Event) => {
    store.setUsername((e.target as HTMLInputElement).value)
}
</script>