import {defineComponent,ref} from 'vue';
import './style.scss'
// @ts-ignore
import HeadTop from '../../components/header/headTop'
const Header = (props:any)=> <header>嘻嘻嘻{props.title}</header>
export default defineComponent({
    name:'Home',
    components:{
        HeadTop
    },
    setup(){
        const show = ref(false)
        setTimeout(()=>{
            show.value = true
        },1000)
        return ()=>(
            <>
                <h1>Home</h1>
                <HeadTop title="主标题"/>
                {
                    show.value ? <Header title="dddd"/> : null
                }
            </>
        )
    }
})