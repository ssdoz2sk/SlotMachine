import Vue from 'vue'
import Router from 'vue-router'
import DemoSlotMachine from '@/demo/SlotMachine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SlotMachine',
      component: DemoSlotMachine
    }
  ]
})
