import {RouteRecordRaw,createRouter,createWebHistory } from 'vue-router'
import Home from '../views/Home'
const NotFound = {
    template: '<div>404</div>',
}

const routes:RouteRecordRaw[] = [
    {
        path:'/',
        redirect:{path:'home'}
    },
    {
        path:'/home',
        name:'home',
        component:Home,
        meta:{cache:true}
    },
    {
        path:'/404',
        name:'404',
        component:NotFound,
        meta:{cache:false}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
router.afterEach((to,from)=>{
    console.log(to,from)
})
export default router