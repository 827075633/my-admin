import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { reqWeather } from '../../api/index'
import menuList from '../../config/menuConfig'
import { Modal } from 'antd'
import './index.less'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentTime: formateDate(Date.now()),
      dayPictureUrl: 'testx',
      weather: 'qin'
    }
  }
  getTime = () => {
    this.Interval = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({currentTime})
    }, 1000);
  }
  getReqWeather = async() => {
    const { dayPictureUrl, weather } = await reqWeather('北京')
    this.setState({dayPictureUrl, weather})
  }

  getTitle = () => {
    //获取当前路由路径
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      if(item.key === path) {
        title = item.title
      } else if (item.children) {
        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          title = cItem.title
        }
      }
    });
    return title
  }

  logoOut = () => {
    Modal.confirm({
      title: '提示',
      content: '确定退出吗？',
      onOk: () => { //需要用箭头函数，不然下面的this指向会不对
        //删除存储的数据
        storageUtils.removeUser()
        memoryUtils.user = {}

        //跳转到login页面
        this.props.history.replace('/')
      },
      onCancel() {
        console.log('cancel')
      }
    })
  }
  /**
   * componentDitMount在第一次render之后执行，一般在此执行异步请求，
   * 如ajax请求/或启动定时器
   */
  componentDidMount () {
    this.getTime()
    //this.getReqWeather()
  }
  componentWillMount () {
    
  }
  //组件卸载之前调用
  componentWillUnmount () {
    //销毁定时器
    clearInterval(this.Interval)
  }
  render() {
    const {currentTime,dayPictureUrl,weather} = this.state;
    const user = memoryUtils.user.username
    const title = this.getTitle()
    return (
      <div className='header'>
        <div className="header-top">
          <span>欢迎{user}</span>
          <a href="javascript:;" onClick={this.logoOut}>退出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="weather"/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header)