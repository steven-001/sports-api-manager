//ajax方法

import axios from "axios"
import router from '../router/index.js'


/**
 * 封装axios
 */
//设置请求头与返回参数
axios.defaults.headers = {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/json;charset=UTF-8"
}
axios.defaults.timeout = 20000;

/**
 * 环境切换
 */
let apiUrl = ''
let HOST = process.env.HOST;
if(HOST === 'prerelease'){                //npm run build -- prerelease 外网测试
  apiUrl = 'https://wct02hji6yu.wm732.com/api'
}
if(HOST === 'test'){                      //npm run build -- test 内网测试
  apiUrl = '/api'
}
if(HOST === 'prod'){                     //npm run build -- prod 正式环境
  apiUrl = 'https://wct01hji6yu.wm732.com/api'
}
if(HOST === 'dev'){
  apiUrl = '/api'
}
console.log(HOST)
axios.defaults.baseURL = apiUrl;//请求地址的域名
//返回数据设置
axios.defaults.responseType = "json";

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    　　// 在发送请求之前做些什么
  let sessionId = sessionStorage.getItem('sessionId')
    if (sessionId!==null&&sessionId!=='') {
        //  让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        config.headers['Authorization'] = sessionId;
      }
    　　return config
    }, function (error) {
    　　// 对请求错误做些什么
    return Promise.reject(error)
    });
    
    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
    　　// 对响应数据做点什么
      if (response.data && response.data.code!=="200") {
        if(response.data.code==="502"){
          router.push({path:'/401'})
        }else if(response.data.code==="401"){
          // alert("登录过期，请重新登录！")
          sessionStorage.removeItem('sessionId')
          sessionStorage.removeItem('roleId')
          // window.location.reload()
        }else{
          return Promise.reject(response.data.msg)
        }
      }
    　return response.data
    }, function (error) {
    　　// 对响应错误做点什么
    　　return Promise.reject(error)
    });
