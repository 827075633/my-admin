/**
 * 入口文件
 */

 import React from 'react'
 import ReactDom from 'react-dom'

 import App from './App'

 import storageUtils from './utils/storageUtils'
 import memoryUtils from './utils/memoryUtils'

 //读取在登录页面保存的user信息，然后存到内存中
 const userInfor = storageUtils.getUser()
 memoryUtils.user = userInfor

 ReactDom.render(<App />, document.getElementById('root'))