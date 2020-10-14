import {defineComponent} from 'vue'
import './style.scss'

export default defineComponent({
    name: 'HeadTop',
    props: {
        scopedSlots: null,
        userInfo: String,
        headTitle: String
    },
    setup(props, context: any) {
        const {userInfo, headTitle} = props
        const scopedSlots = props.scopedSlots || {}
        return () => (
            <header>
                {scopedSlots.logo && scopedSlots.logo()}
                {scopedSlots.search && scopedSlots.search()}
                {userInfo ? <span>{userInfo}</span> : <span class="login_span">登录|注册</span>
                }
                {
                    !!headTitle && <section class="title_head ellipsis">
                        <span class="title_text">{headTitle}</span>
                    </section>
                }

            </header>
        )

    }
})