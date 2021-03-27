/*
  对axios网络请求的封装操作
 */
import axios from 'axios'

//使用回调函数
// export function request(config, successCallback, failureCallback) {
//   //1.创建axios的实例
//   const isntance = axios.create({
//     baseURL: 'http://httpbin.org',
//     timeout: 5000
//   })
//
//   //发送真正的网络请求
//   isntance(config)
//     .then(res => {
//       successCallback(res)
//     })
//     .catch(err => {
//       failureCallback(err)
//     })
// }

//使用回调函数，回调函数为传入的参数中的属性值
// export function request(config) {
//   //1.创建axios的实例
//   const isntance = axios.create({
//     baseURL: 'http://httpbin.org',
//     timeout: 5000
//   })
//
//   //发送真正的网络请求
//   isntance(config.baseConfig)
//     .then(res => {
//       config.success(res)
//     })
//     .catch(err => {
//       config.failure(err)
//     })
// }

//使用Promise的方法
// export function request(config) {
//   return new Promise((resolve, reject) => {
//     //1.创建axios的实例
//     const instance = axios.create({
//       baseURL: 'http://httpbin.org',
//       timeout: 5000
//     })
//
//     //发送真正的网络请求
//     instance(config)
//       .then(res => {
//         resolve(res)
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }

// instance()返回的就是一个Promise
export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    // timeout: 5000
  })

  //2.axios的拦截器
  // 2.1请求拦截的作用
  //1.比如config中的一些信息不符合服务器的要求
  //2.比如每次发送网络请求时，都希望界面中显示一个请求的图标
  //3.某些网络请求，必须携带一些特殊的信息，比如登录要携带token(令牌)
  instance.interceptors.request.use(config => {
    //拦截并打印config
    // console.log(config)
    //返回config
    return config
  }, err => {
    // console.log(err)
  });

  // 2.2响应拦截
  instance.interceptors.response.use(res => {
    console.log(res)
    return res.data
  }, err => {
    console.log(err)
  });

  //3.发送真正的网络请求
  return instance(config)

}
