import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

//解决路由重复的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

export default router
