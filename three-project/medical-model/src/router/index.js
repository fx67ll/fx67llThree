import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 修复路由重复报错
// 获取原型对象上的push函数
const originalPush = Router.prototype.push
// 修改原型对象中的push方法
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

import store from '@/store/index.js'

export const fx67llRoutes = [{
		path: '/',
		name: 'index',
		component: () => import('@v/index.vue') //首页
	}
]

const router = new Router({
	mode: 'hash', // history模式，去掉url中的#
	scrollBehavior: () => ({
		y: 0
	}),
	routes: fx67llRoutes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
	// 不是首页的话将自动显示返回按钮
	if (to.name !== 'index') {
		store.dispatch("setBtnStateAsync", true);
		if(to.name === 'doc') {
			store.dispatch("setBtnTypeAsync", 'doc');
		}else if(to.name === 'splitarea'){
			store.dispatch("setBtnTypeAsync", 'dev');
		}else{
			store.dispatch("setBtnTypeAsync", 'default');
		}
	} else {
		store.dispatch("setBtnStateAsync", false);
	}
	next() // 必须使用 next ,执行效果依赖 next 方法的调用参数
})

export default router