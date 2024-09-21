import { createRouter, createWebHistory } from 'vue-router';
import InitialView from '../components/InitialView.vue';
import AnalysisView from '../components/AnalysisView.vue';

const routes = [
  { path: '/', name: 'InitialView', component: InitialView },
  { path: '/analysis', name: 'AnalysisView', component: AnalysisView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
