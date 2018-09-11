import Vue from 'vue';
import Router from 'vue-router';
import Tasks from './views/Tasks.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'tasks',
            component: Tasks,
        }
    ],
});
