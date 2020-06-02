import Taro, { Component, useState, Config, render, useCallback, useEffect } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, Text, ScrollView} from '@tarojs/components'
import classnames from "classnames"
import './index.less'

function HotSearch(props){

  let { hotSearch, search } = props
  
  return (
    <View className="components__hotsearch">
      <View className="hotsearch__title">
        <Text className="txt">热搜榜</Text>
      </View>
      <ScrollView className="hotsearch__list">
        {
          hotSearch && hotSearch.map((item,index) => {
            return(
              <View onClick={search.bind({}, item.searchWord)} className={classnames("list__item", {third:index<=2})}  key={item.searchWord}>
                <View className="list__item-index">{index+1}</View>
                <View className="list__item-info">
                  <View className="info-top">
                    <View className="info-name">{item.searchWord}</View>
                    <View className="info-score">{item.score}</View>
                    {item.iconUrl && <Image mode="widthFix" className={classnames("info-icon", {third:item.iconType===5})} src={item.iconUrl}></Image>} 
                  </View>
                  <View className="info-bottom">
                    {item.content}
                  </View>

                </View>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )

}
HotSearch.options = {
  addGlobalClass: true,
}
export default HotSearch