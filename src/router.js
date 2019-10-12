import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MainPage from './views/MainPage'
import Resource from './views/Resource'
import Teacher from './views/Teacher'
import Honor from './views/Honor'
import SelfProfile from "./views/SelfProfile";
import Course from "./views/Course";
import Admin from "./views/Admin";
import StudentList from "./views/admin/StudentList";
import HonorList from "./views/admin/HonorList";
import PictureList from "./views/admin/PictureList";
import PictureForm from "./views/admin/PictureForm";
import StudentForm from "./views/admin/StudentForm";

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/student',
            name: 'home',
            component: Home
        },
        {
            path: '/teacher',
            name: 'teacher',
            component: Teacher
        },
        {
            path: '/mainPage',
            name: 'mainPage',
            component: MainPage,
            children: [
                {
                    path: '',
                    component: SelfProfile
                },
                {
                    path: '/honor',
                    component: Honor
                },
                {
                    path: '/course/:courseName',
                    component: Course,
                    children: []
                }
            ]
        },
        {
          path:"/admin",
          name:"admin"  ,
            component:Admin,
            children: [
                {
                    path: '',
                    component: StudentList
                },
                {
                    path: '/studentForm/:id',
                    component: StudentForm,
                },
                {
                    path: '/honorList',
                    component: HonorList
                },
                {
                    path: '/pictureList',
                    component: PictureList,
                },
                {
                    path: '/pictureForm',
                    component: PictureForm,
                }
            ]
        },
        {
            path: '/resource',
            name: 'resource',
            component: Resource
        },
        {
            path: '/teacher',
            name: 'teacher',
            component: Teacher
        },

        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
})
