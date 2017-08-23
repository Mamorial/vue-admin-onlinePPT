import "babel-polyfill";//兼容IE 、、
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import * as ROUTE from './route';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(VueRouter);
Vue.use(ElementUI);
/**使用Vuex**/
import Vuex from 'vuex';
import commonState from './commonState';
Vue.use(Vuex);
const store = new Vuex.Store(commonState);
/****自定义的組件*****/
import {
  Paginate,
  UploadImg,
  UploadVideo,
  RichText,
  UploadMutiImg,
  UploadImgElse
} from './components/public';
Vue.use(Paginate);
Vue.use(UploadImg);
Vue.use(UploadVideo);
Vue.use(RichText);
Vue.use(UploadMutiImg);
Vue.use(UploadImgElse);
/****自定义的組件*****/


const router = new VueRouter({
  // mode: 'history',
  routes: [
  	{
  		path: '/',
      component: ROUTE.Index,
      children: [
      //ppt模板
      	{
          path: 'pptModal',
          component: ROUTE.CommonIndex,
          children: [
            {
              path: 'modal',
              component: ROUTE.pptModalComponent
            },{
            	path: 'edit',
              component: ROUTE.pptModalEditComponent
            }
          ]
       },
       //用户信息
       {
          path: 'userInfo',
          component: ROUTE.CommonIndex,
          children: [
            {
              path: 'info',
              component: ROUTE.userInfoComponent
            },{
              path: 'detail/:id',
              component: ROUTE.userInfoEditComponent
            }
          ]
        }
      ]
  	},
    {
      path: '/404',
      component: ROUTE.Error404,
    },
    {path: '*', redirect: '/404'}//放在最后
  ]
});

let a = sessionStorage.getItem('user');
console.log(a);

//router.beforeEach((to, from, next) => {
//	if(to.path == '/dist/login/') {
//		sessionStorage.removeItem('user');
//	}
//	let user = JSON.parse(sessionStorage.getItem('user'));
//	if(!user && to.path != '/dist/login/') {
//		next({path: '/dist/login/'})
//	} else {
//		next()
//	}
//})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
export default router;
