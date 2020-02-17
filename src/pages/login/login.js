import React, { Component } from 'react';
import {
  Form, Icon, Input, Button, message} from 'antd'
import {Redirect} from 'react-router'
import './login.less'
import logo from '../../assets/images/logo.png'
import {reqLogin} from '../../api'
import memoryUitls from '../../utils/memoryUtils.js'
import storageUtils from '../../utils/storageUtils.js'
/**
 * 登录路由组件
 */
class Login extends Component {
 handleSubmit = (event) => {
   event.preventDefault() // 组织事件默认行为
  // const values = form.getFieldsValue()
  // console.log(values)
  this.props.form.validateFields(async (err, values) => {
    if (!err) {
      const {username,password} = values
      // try{
      //   const response = await reqLogin(username,password)
      //   console.log('请求成功', response)
      // } catch (err) {
      //   console.log('请求异常')
      // }
      // 已经在axios.js中进行了统一的错误处理了，所以不需要在组件中try catch了
      const result = await reqLogin(username,password)
      // const result = response.data
      if (result.status === 0) {
        const user = result.data
        memoryUitls.user = user //保存到内存中
        storageUtils.saveUser(user) // 保存到localStorage中
        message.success('登录成功')
        this.props.history.replace('/')
      } else {
        message.error(result.msg)
      }
      console.log('请求成功', result)
    } else {
      console.log('效验失败！')
    }
  });
 }
  render() {
    // 如果已经登陆就无需在进入到登陆页面
    const user = memoryUitls.user
    if (user && user._id) {
      return <Redirect to="/"/>
    }

    const from = this.props.form;
    const { getFieldDecorator } = from;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form className="login-form" onSubmit={this.handleSubmit}>
            <Form.Item>
              {
                getFieldDecorator('username',{
                  rules: [
                    { required: true, message: 'Please input your username!' },
                    { max: 12, message: '长度不能大于12' },
                    { min: 4, message: '长度不能小于4' },
                    { pattern:/^[a-zA-z0-9_]+$/ , message: '必须是字符串英文数字或下划线组成' }
                ],
                })(
                    <Input 
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}}  />}
                placeholder="Username"
                />
                )
              }
              
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password',{
                  rules: [
                    { required: true, message: 'Please input your password!' },
                    { max: 12, message: '长度不能大于12' },
                    { min: 4, message: '长度不能小于4' },
                    { pattern: /^[a-zA-Z0-9_]+$/}
                  ]
                })(
                <Input 
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'}}  />}
                  placeholder="Password"
                  type="password"
                  />)
              }
              
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
/*
包装Form组件生成一个新的组件: Form(Login)
新组件会向Form组件传递一个强大的对象属性: form
 */
const WrapLogin = Form.create()(Login)
export default WrapLogin
