import Taro, { Component, useState, Config, render, useCallback, useEffect } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, Text} from '@tarojs/components'
import './index.less'

function Channel(props){


  let today = new Date().getDate()

  let jumpToCategory = useCallback( categoryId =>{
    Taro.navigateTo({
      url: `/pages/category/category?categoryId=${categoryId}`
    })
  }, [])



  
  return (
    <View className="channel__wrap">
      <View className="channel__wrap-item">
        <View className="channel__item">
          <View className="channel__item-img">
            <Text className="iconfont icon-rili channel__rili"></Text>
            <Text className="channel__item-date">{today}</Text>
          </View>
          <Text className="chanenl__item-txt">每日推荐</Text>
        </View>
      </View>
      <View className="channel__wrap-item">
        <View className="channel__item">
          <View className="channel__item-img">
            <Text className="iconfont icon-paihangbang channel__rili"></Text>
          </View>
          <Text className="chanenl__item-txt">排行榜</Text>
        </View>
      </View>
    </View>
  )

}
Channel.options = {
  addGlobalClass: true,
}
export default Channel