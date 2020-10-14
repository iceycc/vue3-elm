import {defineComponent, ref,getCurrentInstance} from 'vue';
import './style.scss'
// @ts-ignore
import HeadTop from '../../components/header/headTop'
import { cityGuess } from '../../service/getData'
export default defineComponent({
    name: 'Home',
    components: {
        HeadTop
    },
    methods: {
        reload() {
            window.location.reload()
        }
    },
    setup(props) {
        const vm:any = getCurrentInstance()
        const show = ref(true)
        const inputVal = ref('')
        const scopedSlots = {
            logo: () => <span class="head_logo" onClick="reload">ele.me</span>,
        }
        cityGuess().then(res=>{
            console.log(res)
        })
        return () => (
            <>
                <HeadTop headTitle='home' scopedSlots={scopedSlots}>
                    <button onClick={()=>{
                        vm.ctx.reload()
                    }}>刷新</button>
                </HeadTop>
                <input onInput={(val:any)=>{
                    console.log('111---',val.target.value)
                    inputVal.value = val.target.value
                }}/>
                {inputVal.value}
                <button onClick={()=>{
                    console.log('1121212121')
                }}>点击</button>
                {
                    !!show.value && <nav class="city_nav">
                        <div class="city_tip">
                            <span>当前定位城市：</span>
                            <span>定位不准时，请在城市列表中选择</span>
                        </div>
                    </nav>
                }

            </>
        )
    }
})