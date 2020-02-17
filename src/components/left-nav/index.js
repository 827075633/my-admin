import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import { Menu, Icon, Button } from 'antd'
import menuList from '../../config/menuConfig.js'
import './index.less'
import logo from '../../assets/images/logo.png'

const SubMenu = Menu.SubMenu

class LeftNav extends Component {
  constructor(props) {
    super(props)
    this.state = {openKey: ''}
  }
  /**
   * 使用map+递归调用实现
   */
  
  getMenuHandler_map = (menuList) => {
    return  menuList.map(item => {
        if (!item.children) {
          return (
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
          </Menu.Item>
          )
        } else {
          /**
         * 找到当前展开的那一项
         */
        const path = this.props.location.pathname // 找到当前的path
        const cItem = item.children.find(cItem => cItem.key === path)
        console.log('cItem',cItem)
        if (cItem) {
          this.state.openKey = item.key
          //this.openKey = item.key
        }
          return (
            <SubMenu key={item.key} 
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }>
              {this.getMenuHandler(item.children)}
            </SubMenu>
          )
        }
      })
  }
/**
 * 使用reduce + 递归调用方法实现
 */
  getMenuHandler = (menuList) => {
    return menuList.reduce((pre,item) => {
      // console.log('pre',pre)
      // console.log('item',item)
      if (!item.children) {
        pre.push((
          <Menu.Item key={item.key}>
              <Link to={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
          </Menu.Item>
        ))
      } else {
        /**
         * 找到当前展开的那一项
         */
        const path = this.props.location.pathname // 找到当前的path
        const cItem = item.children.find(cItem => cItem.key === path)
        console.log('cItem',cItem)
        if (cItem) {
          this.state.openKey = item.key
          //this.openKey = item.key
        }
        pre.push((
          <SubMenu key={item.key} 
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }>
              {this.getMenuHandler(item.children)}
            </SubMenu>
        ))
      }

      return pre
    },[])
  }
/*
  在第一次render()之前执行一次
  为第一个render()准备数据(必须同步的)
   */
  componentWillMount() {
    this.menuNodes = this.getMenuHandler(menuList)
  }
  render() {
    const path = this.props.location.pathname // 找到当前的path
    // const openKey = this.openKey
    return (
      <div  className='left-nav'>
        <Link to='/' className='left-nav-header'>
          <img src={logo} alt="logo" />
          <h1>XXX后台</h1>
        </Link>
        <Menu mode='inline' 
        theme='dark'
        defaultOpenKeys={[this.state.openKey]}
        selectedKeys={[path]}>
          {/* <Menu.Item key="/home">
            <Link to='/home'>
              <Icon type="pie-chart" />
              <span>首页</span>
            </Link>
          </Menu.Item>
          <SubMenu key="sub1" 
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }>
            <Menu.Item key="/category">
              <Link to='/category'>
                <span>
                  <Icon type="mail" />
                  <span>品类管理</span>
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/product">
              <Link to='/product'>
                <span>
                  <Icon type="mail" />
                  <span>商品管理</span>
                </span>
              </Link>
            </Menu.Item>
          </SubMenu>
            <Menu.Item key="/user">
              <Link to='/user'>
                <span>
                  <Icon type="mail" />
                  <span>用户管理</span>
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/role"> 
              <Link to='/role'>
                <span>
                  <Icon type="mail" />
                  <span>角色管理</span>
                </span>
              </Link>
            </Menu.Item>*/}
            {
              this.menuNodes
            }
        </Menu>
      </div>
    );
  }
}
/**
 * 让非路由组件拥有路由组件的props,用withRouter高阶组件
 * withRouter高阶组件：
 * 用来包装非路由组件，返回一个新的组件，
 * 新的组件向非路由组件传递三个props: location,history,match
 */
export default withRouter(LeftNav)

