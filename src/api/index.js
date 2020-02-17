/**
 * 包含应用中所有接口请求函数模块
 * 每个函数的返回值都是promise
 */
import ajax from './ajax.js'
import jsonp from 'jsonp'
import {message} from 'antd'
//  export function reqLogin() {
//     return ajax('/login', {username,password}, 'POST')
//  }
//改用箭头函数的方式替代上面注释掉的代码,箭头函数中的箭头有返回的作用
//登录
export const reqLogin = (username,password) => ajax('/login', {username,password}, 'POST')

//添加用户
export const reqAddUser = (user) => ajax('manage/user/add', user, 'POST')

//天气请求函数
export const reqWeather = (city) => {
    console.log(city)
    return new Promise((reslove,reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        console.log(url)
        jsonp(url, {}, (err, data) => {
            if (!err && data.status === 'success') {
                reslove(data)
            }else{
                message.error('获取天气失败')
            }
        })
    })
    
}

reqWeather('北京')