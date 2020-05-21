import {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import carPng from "../../../images/ic_menu_shoping_nor.png"
import './index.less'

function GoodsBottom(props){

  return(
    <View className="goodsbottom__wrap">
      <View className="goodsbottom__collect">
        <View className="goodsbottom__collect-img"></View>
      </View>
      <View className="goodsbottom__collect goodsbottom__car">
        <View className="goodsbottom__collect goodsbottom__car-item">
          <View className="goodsbottom__car-count">{props.allnumber}</View>
          <Image className="goodsbottom__car-img" src={carPng}></Image>
        </View>
      </View>
      <View className="goodsbottom__buy">
        立即购买
      </View>
      <View className="goodsbottom__addcart">
        加入购物车
      </View>
    </View>
  )

}

export default GoodsBottom