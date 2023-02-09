<template>
    <div class="main-container">
        <nav class="nav">
            <ul>
                <li
                    v-for="item in routerList"
                    :key="item.key"
                    class="router-item"
                    :class="{active: isActive(item.value)}"
                    @click="pageChange(item.value)"
                >
                    {{ item.value }}
                </li>
            </ul>
        </nav>
        <router-view class="view-content" />
    </div>
</template>

<script lang="ts" setup>
import { RouterName } from './router'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()

const routerList = Object.entries(RouterName).map(([key, value]) => ({
    key,
    value
}))
const pageChange = (name: string) => {
    router.push({name})
}

const activeRoute = computed(() => route.name)
const isActive = (name: string) => name === activeRoute.value
</script>

<style lang="less">
@import url('./index.less');

.main-container {
    width: 100%;
    height: 100%;
    display: flex;

    .nav {
        width: 200px;
        height: 100%;
        border-right: 1px solid var(--border-color);
        
        .router-item {
            line-height: 50px; 
            color: var(--black-text);   
            font-weight: bold;
            text-indent: 16px;
            cursor: pointer;
            border-radius: 4px;

            &.active {
                color: var(--blue-text);
                background-color: var(--blue-bg);
            }
        }
    }
    
    .view-content {
        flex: 1;
        height: 100%;
        padding: 8px 16px;
    }
}
</style>