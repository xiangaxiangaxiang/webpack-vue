import {defineComponent, ref} from 'vue'

export default defineComponent({
    name: 'TestTsx',
    props: {
        mainTitle: {
            type: String,
            default: ''
        }
    },
    setup (props) {
        const msg = ref('this is msg')
        return () => (
            <>
                <div>
                    {msg.value}
                </div>
                <div>
                    {props.mainTitle}
                </div>
            </>
        )
    }
})