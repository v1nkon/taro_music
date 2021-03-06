import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Home from './pages/home'

import store from './store'

import './app.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }


class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/home/home',
      'pages/searchresult/searchresult',
      'pages/search/search',
      'pages/song/song',
      'pages/songlist/songlist',
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#d43c33",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "white"
    },
    requiredBackgroundModes: ["audio"],
    // tabBar: {
    //   color: "#666",
    //   selectedColor: "#b4282d",
    //   backgroundColor: "#fafafa",
    //   borderStyle: 'black',
    //   list: [{
    //     pagePath: "pages/home/home",
    //     iconPath: "./images/ic_menu_choice_nor.png",
    //     selectedIconPath: "./images/ic_menu_choice_pressed.png",
    //     text: "首页"
    //   }, {
    //     pagePath: "pages/home/home",
    //     iconPath: "./images/tab-bar/cate.png",
    //     selectedIconPath: "./images/tab-bar/cate-active.png",
    //     text: "分类"
    //   }
    // ]
    // }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
