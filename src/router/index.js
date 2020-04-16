import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Discovery from '../components/Main/Discovery'
import Musicvideo from '../components/Main/Musicvideo'
import New from '../components/Main/New'
import Recommend from '../components/Main/Recommend'
import Upload from '../components/Main/Upload'
import Playing from '../components/Main/Playing'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/discovery'
  },
  /*
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/!* webpackChunkName: "about" *!/ '../views/About.vue')
  } */
  {
    path: '/discovery',
    name: 'Discovery',
    component: Discovery
  },
  {
    path: '/musicvideo',
    name: 'Musicvideo',
    component: Musicvideo
  },
  {
    path: '/new',
    name: 'New',
    component: New
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/playing',
    name: 'Playing',
    component: Playing
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
