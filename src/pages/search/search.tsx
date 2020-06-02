import { ComponentClass } from 'react'
import Taro, { Component, Config, useEffect, useState, useMemo, useResize, useCallback } from '@tarojs/taro'
import { View, Button, Text, ScrollView, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import classname  from "classnames"


import './search.less'
import { getScrollHeight, pushKeywordIntoStorage } from '@/utils/index'
import { getHotSearch } from "@/actions"



import HeadSearch from "@/components/Search"
import SearchedHistory from "./SearchHistory"
import HotSearch from "./HotSearch"


function Search(props){
  let {
    loadingHotSearch,
    hotSearch
  } = props

  useEffect(() => {
    loadingHotSearch()
  }, [])
  let [keyword, setKeyWord] = useState("")

  let inputChange = useCallback((e) => {
    console.log(e.detail.value)
    setKeyWord(e.detail.value)
  }, [])

  let searchKeyWords = useCallback( ( keyword2 ) => {
    let curkeyword = keyword2 || keyword
    Taro.navigateTo({
      url: `/pages/searchresult/searchresult?keyword=${curkeyword}`
    })
    pushKeywordIntoStorage(curkeyword)
  }, [keyword] ) 

  return(
    <View className="page__search">
      <HeadSearch 
        keyword = {keyword}
        inputChange = {inputChange}
        search = {searchKeyWords}
      />
      <ScrollView
        className="scroll"
        scrollY
        style={{height: getScrollHeight(94) + 'rpx'}}
      >
        <SearchedHistory />
        <HotSearch 
          hotSearch = {hotSearch}
          search = {searchKeyWords}
        />
      </ScrollView>
    </View>
  )
}

Search.config = {
  navigationBarTitleText: '搜索'
}


export default connect(
  state => ({
    ...state.homeReducer,
  }),
  dispatch => ({
    loadingHotSearch: data => {
      dispatch(getHotSearch(data))
    }
  })
  
  )(Search)