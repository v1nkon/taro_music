import { useMemo } from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import './index.less'
// import { getScrollHeight } from "../../../utils"



import Goods from '@/components/Goods'
import {Goods as MyGoods, Category} from "@/constants/interface"
import { getScrollHeight } from '@/utils/index'

import GoodsListComponent from '@/components/GoodsList'

interface OwnProps{
  goodsList: Array<MyGoods>
  subList?: Array<Category|any>
  curSubCategoryId: number
}

function GoodsList(props:OwnProps){

  let { goodsList = [], subList, curSubCategoryId } = props

  let scrollHeight = getScrollHeight(84)

  let curCategory = useMemo( () => {
    if( subList && curSubCategoryId ){
      let cur = subList.filter(category => category.id === curSubCategoryId)
      return cur[0]
    }
    return {
      
    }
  } , [subList, curSubCategoryId])



  return(
    <ScrollView
      className="goods__list"
      scrollY
      style={{ height: scrollHeight + 'rpx' }}
    >
      <View className="goods__list-title">
        <View className="goods__list-name">{curCategory.name}</View>
        <View className="goods__list-intro">{curCategory.front_desc}</View>
      </View>
      <GoodsListComponent 
        goodsList = {goodsList}
        hasPadding = { false }
      />
    </ScrollView>
  )
}

export default GoodsList
