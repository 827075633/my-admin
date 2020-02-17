/**
 * 进行localStorage保存的工具模块
 */
import store from 'store' //引入store库，保证各个浏览器都能兼容localStorage,且语法简洁
const USER_KEY = 'user_key'

 export default {
    saveUser (user) {
       // localStorage.setItem(USER_KEY, JSON.stringify(user))
       store.set(USER_KEY, user)
    },

    getUser () {
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        return store.get(USER_KEY) || {}
    },

    removeUser () {
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    }

}