import {Component} from '@tarojs/taro'
import { View, Image, Input } from '@tarojs/components'
import './index.less'
import classnames from 'classnames'

function GoodsCount(props){

  let { info = {}, showPop } = props
  let popClass = classnames('goods__count-wrap',{
    'pop-up':showPop,
    'pop-down': !showPop
  })

  return(
    <View className={popClass}>
      <View className="goods__count-fixed" onClick={props.togglePop}>
      </View>
      <View className="goods__count-pop">
        <View className="goods__count-top">
          <Image className="goods__count-img" src={info.primary_pic_url}></Image>
          <View className="goods__count-topright">
            <View>
              <View className="price">价格￥{info.retail_price}</View>
              <View className="count">请选择数量</View>
            </View>
          </View>
          <View className="goods__count-close" onClick={props.togglePop}>
          X
          </View>
        </View>
        <View className="goods__count-bottom">
          <View>数量</View>
          <View className="goods__count-count">
            <View className="minus" onClick={props.toggleGoodsCount && props.toggleGoodsCount.bind({}, -1)}>-</View>
            <Input className="input" value={props.goodsCount} disabled />
            <View className="plus" onClick={props.toggleGoodsCount && props.toggleGoodsCount.bind({}, 1)}>+</View>
          </View>
        </View>
      </View>
    </View>
  )
  

}

export default GoodsCount