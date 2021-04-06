import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = () => import("views/home/Home")
const Detail = () => import("views/detail/Detail")
const Category = () => import('views/category/Category')
const ShoppingCart = () => import('views/shoppingcart/ShoppingCart')
const Profile = () => import('views/profile/Profile')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shoppingcart',
    component: ShoppingCart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail',
    component: Detail
  }
]

export default new VueRouter({
  routes,
  mode: 'history',
})
