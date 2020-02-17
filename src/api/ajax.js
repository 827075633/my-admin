/**
 * 定义axios函数
 * 封装axios库
 * axios的返回值是promise对象
 */

 import axios from 'axios'
 import { message } from 'antd'

 export default function ajax(url, data={}, method='GET') {
     let promise
     return new Promise((resolve,reject) => { //统一通过new Promise的方式来进行错误处理
        if (method === 'GET') {
            promise = axios.get(url, {
                params: data
            })
        } else {
            promise = axios.post(url,data)
        }
        promise.then(response => {
            resolve(response.data)
        }).catch( err =>{
            // reject(err) 不能调用reject，而是直接进行错误提示，如果调用reject就会进到try catch里面，
            message.error('请求出错了'+err.message)
        })
     })
     
 }