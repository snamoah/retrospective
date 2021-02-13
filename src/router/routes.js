import Session from '../pages/Session.vue';
import NotFound from '../pages/NotFound.vue';
import LandingPage from '../pages/LandingPage.vue';

const routes = [
  { path: '/', component: LandingPage },
  {
    name: 'session',
    path: '/retros/:id',
    component: Session,
  },
  { path: '*', component: NotFound },
];

export default routes;
