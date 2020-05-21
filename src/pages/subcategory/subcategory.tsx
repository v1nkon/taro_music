import { ComponentClass } from 'react'
import Taro, { Component, Config, useEffect, useState, useMemo, useResize, useCallback } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'


import './SubCategory.less'

import SubcategoryList from "./CategoryList"
import GoodsList from "./GoodsList"

import {Goods, Category} from '@/constants/interface'
import { loadingGoods } from '@/actions'


interface OwnProps {
  categoryDetail: Category
  loadingGoods: (curSubCategoryId:number) => void
  goodsList: Array<Goods>
}


function SubCategory(props:OwnProps){
  let {
    categoryDetail,
    loadingGoods,
    goodsList = []
  } = props

  let [curSubCategoryId, setCurSubCategoryId] = useState(0)

  useEffect(() => {
    setCurSubCategoryId(parseInt(this.$router.params.categoryId))
  }, [])
  useEffect(() => {
      curSubCategoryId && loadingGoods(curSubCategoryId)
  }, [curSubCategoryId])

  let chooseSubCategory = useCallback((categoryId) => {
    setCurSubCategoryId(categoryId)
  }, [])


  return(
    <View className="page__SubCategory">
        <View className="page__SubCategory-content">
          <SubcategoryList
            categoryList = {categoryDetail}
            curSubCategoryId = {curSubCategoryId}
            chooseSubCategory = {chooseSubCategory}
          />
          <GoodsList 
            goodsList = {goodsList}
            subList = {categoryDetail ? categoryDetail.subList : []}
            curSubCategoryId = {curSubCategoryId}
          />
        </View>
    </View>
  )
}

SubCategory.config = {
  navigationBarTitleText: '子分类'
}


export default connect(
  state => ({
    ...state.categoryReducer
  }),
  dispatch => ({
    loadingGoods: data => {
      dispatch(loadingGoods(data))
    },
  })
  
  )(SubCategory)