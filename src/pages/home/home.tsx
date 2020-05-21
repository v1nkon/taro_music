// import { ComponentClass } from 'react'
import Taro, { Component, Config, useEffect, useState } from '@tarojs/taro'
import { View, Button, Text, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'


import './home.less'


import BannerList from "./BannerList"
import Channel from "./Channel"
import Recommand from "./Recommand"
import { loadingHomeData } from "@/actions"
import {getScrollHeight} from "@/utils/index"


function Home(props){
  let {
    loadingHomeData,
    banners,
    recommands
  } = props

  let [scrollHeight, setScrollHeight] = useState(0)

  useEffect( () => {
    loadingHomeData()
    setScrollHeight(getScrollHeight(80))
    
  }, [])
  


  return(
    <View className="page__home">
      <View style={{height:"80rpx"}}>
        search-component
      </View>
       <ScrollView
        style = {{height: scrollHeight + 'rpx'}}
        scrollY
       >
        <BannerList 
          banners = {banners}
        />
        <Channel 
        />
        <Recommand 
          recommands = {recommands}
        />
       </ScrollView>
      </View>
  )
}

Home.config = {
  navigationBarTitleText: '首页'
}


export default connect(
  state => ({
    ...state.homeReducer
  }),
  dispatch => ({
    loadingHomeData: data => {
      dispatch(loadingHomeData(data))
    }
  })
  
  )(Home)
