import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const username = ref('')
    const reverse = computed(() => {
        return username.value.split('').reverse().join('')
    })
    const setUsername = (value: string) => username.value = value

    return {
        username,
        reverse,
        setUsername
    }
})