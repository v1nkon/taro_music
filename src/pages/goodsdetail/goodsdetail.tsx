import { ComponentClass } from 'react'
import Taro, { Component, Config, useEffect, useState, useMemo, useResize, useCallback } from '@tarojs/taro'
import { View, Button, Text, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'


import './GoodsDetail.less'
import { loadingGoodsDetail } from '@/actions'
import Banner from './Banner'
import GoodsInfo from './GoodsInfo'
import GoodsCountComponent from './GoodsCount'
import GoodsAttributes from './GoodsAttributes'
import GoodsImages from './GoodsImages'
import GoodsBottom from './GoodsBottom'
import { getScrollHeight } from '@/utils/index'



interface OwnProps {
  loadingGoodsDetail: (curGoodsDetailId:number) => void
}


function GoodsDetail(props:OwnProps){
  let {
    loadingGoodsDetail,
    allnumber = 0,
    attribute = [],
    brand = [],
    gallery = [],
    info = [],
    iscollect = 0,
    issue = [],
    productList = [],
  } = props

  let [curGoodsDetailId, setCurGoodsDetailId] = useState(0)
  let [showPop, setShowPop] = useState(false)
  let [goodsCount,setGoodsCount] = useState(0)

  useEffect(() => {
    setCurGoodsDetailId(1134030)
    // setCurGoodsDetailId(parseInt(this.$router.params.goodsId))
  }, [])

  let scrollHeight = useMemo( () => {
    return getScrollHeight(100)
  }, [])  

  useEffect(() => {
      curGoodsDetailId && loadingGoodsDetail(curGoodsDetailId)
  }, [curGoodsDetailId])

  let togglePop = useCallback(()=>{
    setShowPop(pre => !pre)
  }, [])

  let toggleGoodsCount = useCallback((count)=>{
    setGoodsCount(pre=>{
      if( count + pre >= 1 ){
        return count + pre
      }else{
        return 1
      }
    })
  }, [])



  return(
    <View className="page__GoodsDetail">
      <ScrollView
        scrollY
        style={{height: scrollHeight + 'rpx'}}
      >
        <Banner 
          gallery = {gallery}
        />
        <View className="page__GoodsDetail-service">
          <View className="page__GoodsDetail-serviceitem">30天无忧退货</View>
          <View className="page__GoodsDetail-serviceitem">48小时快速退款</View>
          <View className="page__GoodsDetail-serviceitem">满88元免邮费</View>
        </View>
        <GoodsInfo 
          info = {info}
        />
        <View className="page__GoodsDetail-count" onClick={togglePop}>
          <View>请选择规格数量</View>
          <View className="page__GoodsDetail-iconright"></View>
        </View>
        <GoodsAttributes 
          attributes = {attribute}
        />
        <GoodsImages
          info = {info}
        />
      </ScrollView>
      <GoodsCountComponent 
        showPop = {showPop}
        togglePop = {togglePop}
        info = {info}
        goodsCount = {goodsCount}
        toggleGoodsCount = {toggleGoodsCount}
      />
      <GoodsBottom 
        allnumber = {allnumber}
      />
    </View>
  )
}

GoodsDetail.config = {
  navigationBarTitleText: '商品详情'
}


export default connect(
  state => ({
    ...state.goodsReducer
  }),
  dispatch => ({
    loadingGoodsDetail: data => {
      dispatch(loadingGoodsDetail(data))
    },
  })
  
  )(GoodsDetail)