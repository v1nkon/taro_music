import {Component, useEffect, useMemo, useCallback, useState} from '@tarojs/taro'
import {View, ScrollView, Image, Label, Swiper, SwiperItem, Button} from '@tarojs/components'
import './index.less'


import {Gallery} from "@/constants/interface"


interface OwnProps{
  gallery: Array<Gallery>
}

function GoodsList(props:OwnProps){

  let { gallery = [] } = props


  return(
    <View className="goodsdetail__banner">
      <Swiper className="goodsdetail__banner-wrap"
        circular
        autoplay
        indicatorDots
        indicatorActiveColor='rgb(178, 42, 49)'
      >
        {
          gallery.map((item,index) => {
            return(
              <SwiperItem className='goodsdetail__banner-item' key={index}>
                <Image className='goodsdetail__banner-img' src={item.img_url}></Image>
              </SwiperItem>
            )
          })
        }
      </Swiper>
      <Button className="goodsdetail__banner-btn">分享商品</Button>
    </View>
  )
}

export default GoodsList
