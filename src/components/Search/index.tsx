import Taro, { Component, useState, Config, render } from '@tarojs/taro'
import { View, Input, SwiperItem, Image, Label } from '@tarojs/components'
import classNames from 'classnames'
import './index.less'

interface OwnProps {
  isFixed:boolean,
  count?: number
}

export default function Search(props:OwnProps){


  let searchClass = classNames('search', {
    'search-fixed': props.isFixed
  })
  return (
    <View className={searchClass}>
      {
        props.isFixed && <View className="seach__location">西藏自治区......</View>
      }
      <View className="search__input">
        <Label className="search__input-icon"></Label>
        <View className="search__input-input">商品搜索,共{props.count||0}件好物</View> 
      </View>
    </View>
  )

}