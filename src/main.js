import Vue from 'vue'
// import VueAxiosPlugin from 'vue-axios-plugin'
import axios from 'axios'
Vue.prototype.$axios = axios;
// axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true; //允许Cookie, Session 同一个ID
axios.defaults.baseURL ='http://39.105.171.94:80/backend';
// axios.defaults.baseURL ='http://127.0.0.1:8080/backend';
// axios.defaults.x

//
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import qs from 'qs'
//
import App from './App.vue'
import router from './router'
//
import constant from  './commons/Constant'
import utils from './commons/Utils'


Vue.use(ElementUI);
Vue.use(utils); //把自己的js 制作成为 插件的形式
// Vue.use(VueAxiosPlugin, {
//   // 请求拦截处理
//   reqHandleFunc: config => config,
//   reqErrorFunc: error => Promise.reject(error),
//   // 响应拦截处理
//   resHandleFunc: response => response,
//   resErrorFunc: error => Promise.reject(error),
//   //线上环境，必须配置
//   baseUrl : '/api',
// })
// })

Vue.config.productionTip = false
Vue.prototype.constant = constant  //全局注册,任何组件都能直接使用
Vue.prototype.qs = qs  //全局注册,任何组件都能直接使用

Vue.prototype.linkTo=function (obj) {
  this.$router.push(obj);
};

//响应拦截，直接判断是否已经登录
router.beforeEach((to,from,next)=>{
  if(to.path == '/home'){
    next();
  }else if(to.path == '/Login'){
    next();
  }else if(to.path == '/Register'){
    next();
  }else if(to.path == '/ForgetPassword'){
    next();
  }else if(to.path == '/ItemDetails'){
    next();
  } else{
    // alert('您还没有登录，请先登录');
    if(constant.userInfo.username == null){
      Vue.prototype.getAxios().post("/user/getUserInfo.do"
      ).then(response => {
        // console.log(response);
        if(response.data.status == 0){
          next();
        }else
          next("/Login");

        //console.log(this.constant.userInfo);
      }).catch(response =>{
        // next('/Login');
        console.log("网络出现bug"+response);
         next("/Login")
      });
    }else {
      next();
    }

  }
})


new Vue({
  router,
  render: h => h(App),

}).$mount('#app')
