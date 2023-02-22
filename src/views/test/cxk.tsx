import { defineComponent } from 'vue'

export default defineComponent({
    name: 'AreYouOk',
    setup () {
        const hobbies = ['singing', 'dancing', 'rap', 'basketball']

        return () => (
            <div>
                i like {hobbies.join(',')}
            </div>
        )
    }
})