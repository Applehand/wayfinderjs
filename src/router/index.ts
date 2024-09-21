import { createRouter, createWebHistory } from 'vue-router';
import InitialView from '../components/InitialView.vue';
import AnalysisView from '../components/AnalysisView.vue';
import PresentationView from '../components/PresentationView.vue';


const routes = [
  { path: '/', name: 'InitialView', component: InitialView },
  { path: '/analysis', name: 'AnalysisView', component: AnalysisView },
  { path: '/presentation', name: 'PresentationView', component: PresentationView }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
