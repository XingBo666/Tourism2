/**
 * axios封装
 * 请求拦截，响应拦截，错误统一处理
 * 封装 get()，post() 方法
 */

import qs from 'qs'  // 引入qs，对 post 参数进行序列化

axios.defaults.timeout = 10 * 1000;// 设置请求超时 10s
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';// post 请求头

// 根据不同环境更改不同 baseUrl
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '';  // 开发环境
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = '';  // 生产环境
}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});



/**
 * 封装 get() 请求
 * get()方法，对应 axios.get()请求
 * url [请求的url地址]
 * params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    })
  });
}


/**
 * 封装 post() 请求
 * post()方法，对应 axios.post()请求
 * url [请求的url地址]
 * params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params)
    ).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    })
  });
}
