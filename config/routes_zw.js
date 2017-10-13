import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../src/Main.vue'
import Index from '../src/components/Index.vue'
import Map from '../src/components/Map.vue'
import Information from '../src/components/Information.vue'
import InformationPara from '../src/components/InformationPara.vue'
import Activitys from '../src/components/Activitys.vue'
import ActivityPara from '../src/components/ActivityPara.vue'

Vue.use(VueRouter)
const routes = [
  {path: '/', component: Index},
  {path: '/map', component: Map},
  {path: '/information', component: Information},
  {path: '/informationPara', component: InformationPara},
  {path: '/activitys', component: Activitys},
  {path: '/activityPara', component: ActivityPara}
]

export default new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes:routes
})