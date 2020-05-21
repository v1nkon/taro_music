import {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './index.less'

function GoodsAttributes(props){

  return(
    <View className="goodsattributes__wrap">
      <View className="goodsattributes__title">商品参数</View>
      {
        props.attributes && props.attributes.map( attribute => {
          return(
            <View className="goodsattributes__attribute" key={attribute.name}>
              <View className="goodsattributes__attribute-name">{attribute.name}</View>
              <View className="goodsattributes__attribute-value">{attribute.value}</View>
            
            </View>
          )
        } )
      }
    </View>
  )

}

export default GoodsAttributes