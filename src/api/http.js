// 封装axios
import axios from 'axios';
import Qs from 'qs';
import store from '../store';
import router from '../router';
import { Message } from 'element-ui';



/** 
 * 携带当前页面路由跳转登录页，在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
      path: '/login',        
      query: {
          redirect: router.currentRoute.fullPath
      }
  });
}
/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, statusText) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      // tip('登录过期，请重新登录');
      localStorage.removeItem('token');
      // store.commit('loginSuccess', null);
      setTimeout(() => {
          toLogin();
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      // Message({
      //   type:'error',
      //   message:statusText,
      //   center:true,
      //   duration:2000
      // });
      break;
    default:
      // console.log(status,other);   
      // console.log(arguments);   
      Message({
        type:'error',
        message:statusText,
        center:true,
        duration:2000
      })
  }

}

// 创建axios实例
const instance = axios.create({ 
  baseURL:'/api',
  timeout: 1000 * 10 
});
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */ 
instance.interceptors.request.use(    
  config => {        
    const token = store.state.token;        
    token && (config.headers.Authorization = token);        
    return config;    
  },    
  error => {
    console.log('请求超时');
    Promise.error(error);
  }
)

// 响应拦截器
instance.interceptors.response.use(    
  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),    
  error => {
    const { response } = error;
    if (response) {
      errorHandle(response.status, response.statusText);
      return Promise.reject(response);
    } 
  }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){    
  return new Promise((resolve, reject) =>{        
    instance.get(url, {            
        params:params,
        withCredentials: true,       
    }).then(res => {
        resolve(res.data);
    }).catch(err =>{
        reject(err)        
    })    
  });
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    instance.post(url, Qs.stringify(params),{withCredentials: true})
    .then(res => {
        resolve(res.data);
    })
    .catch(err =>{
        reject(err.data)
    })
  });
}
