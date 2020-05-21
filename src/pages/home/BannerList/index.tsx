import Taro, { Component, useState, Config, render } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.less'

export default function BannerList(props){

  return (
    <View className="bannerlist">
      <Swiper className="bannerlist__wrap"
        circular
        autoplay
        indicatorDots
        indicatorActiveColor='rgb(178, 42, 49)'
      >
        {props.banners.map( item => (
          <SwiperItem className='bannerlist__wrap-item' key={item.targetId}>
            <Image className='bannerlist__wrap-img' src={item.pic}></Image>
          </SwiperItem>
        ) )}
      </Swiper>
    </View>
  )

}