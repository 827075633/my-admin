import React, { Component } from 'react'
import { Redirect } from 'react-router'
import memoryUitls from '../../utils/memoryUtils.js'
/**
 * 后台管理组件
 */
export default class Admin extends Component {
  render() {
    const user = memoryUitls.user
    if (!user || !user._id) {
      return <Redirect to='/login' />
    }
    return (
      <div>
        hello {user.username}
      </div>
    );
  }
}
