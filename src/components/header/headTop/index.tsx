import {defineComponent} from 'vue'
export default defineComponent({
    name:'Header',
    props:{
        title:String
    },
    setup(props){
        return () => (
            <>
                <header> Header  </header>
            </>
        )

    }
})