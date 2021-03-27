/*
对home页面的网络请求进行封装
 */
import {request} from "@/network/request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
     type,
     page
    }
  })
}
