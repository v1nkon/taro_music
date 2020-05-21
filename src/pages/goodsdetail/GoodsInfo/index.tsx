import {Component, useEffect, useMemo, useCallback, useState} from '@tarojs/taro'
import {View, ScrollView, Image, Label, Swiper, SwiperItem, Button} from '@tarojs/components'
import './index.less'


import {Info} from "@/constants/interface"


interface OwnProps{
  info: Info
}

function GoodsList(props:OwnProps){

  let { info } = props


  return(
    <View className="goodsdetail__goodsinfo">
      <View className="goodsdetail__goodsinfo-name">
        {info.name}
      </View>
      <View className="goodsdetail__goodsinfo-into">
        {info.goods_brief}
      </View>
      <View className="goodsdetail__goodsinfo-price">
        ￥{info.retail_price}
      </View>
    </View>
  )
}

export default GoodsList
