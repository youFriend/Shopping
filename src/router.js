import Vue from 'vue'
import Router from 'vue-router'
//
import Home from  './views/portal/Home'
import MyShopCart from  './views/portal/MyShopCart'
import UserCenter from  './views/portal/UserCenter'
import About from  './views/portal/About'
import ItemDetails from  './views/portal/ItemDetails'
import Login from  './views/portal/Login'
import Register from  './views/portal/Register'
import ForgetPassword from  './views/portal/ForgetPassword'
import SubmitOrder from  './views/portal/SubmitOrder'
import PayView from  './views/portal/PayView'
import PaySuccess from  './views/portal/PaySuccess'
//后台功能
import UploadProducts from  './views/backend/UploadProducts'


Vue.use(Router)

export default new Router({
  // mode:"history", //生产环境的时候就需要使用

  routes: [
    {
      path: '/', // 默认地址
      redirect: '/home'
    },
    {
      name:"Home" ,
      path:'/home',
      component:Home,
    },
    {
      name:"MyShopCart" ,
      path:'/MyShopCart',
      component:MyShopCart,
    },
    {
      name:"UserCenter" ,
      path:'/UserCenter',
      component:UserCenter,
    },
    {
      name:"About" ,
      path:'/About',
      component:About,
    },
    {
      name:"ItemDetails" ,
      path:'/ItemDetails',
      component:ItemDetails,
    },
    {
      name:"Login" ,
      path:'/Login',
      component:Login,
    },
    {
      name:"Register" ,
      path:'/Register',
      component:Register,
    },
    {
      name:"ForgetPassword" ,
      path:'/ForgetPassword',
      component:ForgetPassword,
    },
    {
      name:"SubmitOrder" ,
      path:'/SubmitOrder',
      component:SubmitOrder,
    },
    {
      name:"PayView" ,
      path:'/PayView',
      component:PayView,
    },
      //暂时的接口
      //TODO 记得移除
      {
          name:"UploadProducts" ,
          path:'/UploadProducts',
          component:UploadProducts,
      },
      //PaySuccess
    {
      name:"PaySuccess" ,
      path:'/PaySuccess',
      component:PaySuccess,
    },
  ],

})
