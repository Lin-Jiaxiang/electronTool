import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/', 
    name: 'index',
    component: () => import('@/components/view/picText.vue')
  },
  {
    path: '/pdf', 
    name: 'pdf',
    component: () => import('@/components/view/pdfEdit.vue')
  }
]

const router = new VueRouter({
  routes
});

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router