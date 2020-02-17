import React, { Component } from 'react'
import { Redirect,Route,Switch } from 'react-router'
import { Layout } from 'antd'
import memoryUitls from '../../utils/memoryUtils.js'
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'
import Home from '../home/home.js'
import Category from '../category/category.js'
import Product from '../product/product.js'
import Role from '../role/role.js'
import User from '../user/user.js'
import Bar from '../charts/bar/bar.js'
import Line from '../charts/line/line.js'
import Pie from '../charts/pie/pie.js'

const { Footer, Sider, Content } = Layout
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
      // <div>
      //   hello {user.username}
      // </div>
      <Layout style={{height: '100%'}}>
        <Sider><LeftNav /></Sider>
        <Layout>
          <Header></Header>
          <Content style={{margin: 20,background: '#fff'}}>
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/role' component={Role}/>
              <Route path='/user' component={User}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
              <Redirect to='/home' component={Home}/>
            </Switch>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}
