import { defineComponent } from "vue"

export default defineComponent({
    render() {
        return (
            <div>
                {name}
            </div>
        )
    },

    setup() {
        const name = ref("test")

        return {
            name,
        }
    },
})
