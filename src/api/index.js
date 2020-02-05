/**
 * 包含应用中所有接口请求函数模块
 * 每个函数的返回值都是promise
 */
import ajax from './axios'
//  export function reqLogin() {
//     return ajax('/login', {username,password}, 'POST')
//  }
//改用箭头函数的方式替代上面注释掉的代码,箭头函数中的箭头有返回的作用
//登录
export const reqLogin = (username,password) => ajax('/login', {username,password}, 'POST')

//添加用户
export const reqAddUser = (user) => ajax('manage/user/add', user, 'POST')