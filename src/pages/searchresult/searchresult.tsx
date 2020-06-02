import { ComponentClass } from 'react'
import Taro, { Component, Config, useEffect, useState, useMemo, useResize, useCallback } from '@tarojs/taro'
import { View, Button, Text, ScrollView, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import classnames  from "classnames"


import './searchresult.less'
import { getScrollHeight } from '@/utils/index'
import { getSearch, togglePlay, pushPlayList } from "@/actions"

import { tabList } from '@/constants/constant.ts'

import HeadSearch from "@/components/Search"
import AudioControl from "@/components/AudioControl"
import Song from './Song'



function SearchResult(props){
  let {
    togglePlay,
    loadingSearch,
    pushPlayList,
    songInfo,
    song,
    playSongList,
    preSong,
    isPlay
  } = props

  let [keyword, setKeyWord] = useState("")
  let [curTab, setCurTab] = useState("song")
  let [offset, setOffset] = useState(0)

  let searchKeyWords = useCallback((routeKeyword = '') => {
    let curKeyword = routeKeyword || keyword
    curKeyword && loadingSearch({
                  keywords: curKeyword,
                  type: 1,
                  limit: 30,
                  offset,
                  clear: routeKeyword ? true : false
                })
      
    
  }, [keyword, offset])

  useEffect( () => {
    setKeyWord( this.$router.params.keyword )
    searchKeyWords(this.$router.params.keyword)
  }, [] )

  useEffect(() => {
    searchKeyWords()
  },[offset])

  console.log(songInfo)

  
  let refresh = useCallback(() => {
    setOffset(pre => pre + 30)
  }, [])
  
  let inputChange = useCallback((e) => {
    console.log(e.detail.value)
    setKeyWord(e.detail.value)
  }, [])
  
  
  let tabPageClass = useCallback(curName => {
    return classnames("tab__page", "page__searchresult-"+curName, {'is-show': curName === curTab})
  }, [curTab, classnames])
  return(
    <View className="page__searchresult">
      <HeadSearch 
        keyword = {keyword}
        inputChange = {inputChange}
        search = {searchKeyWords}
      />
      <ScrollView
        className="tab__list"
        scrollX
        enableFlex
      >
        {
          tabList.map(tab => {
            return(
              <View key={tab.name} onClick={setCurTab.bind({}, tab.name)} className={classnames("tab__item", {active: tab.name === curTab})} >
                {tab.title}
                <View className="underline"></View>
              </View>
            )
          })
        }
      </ScrollView>
      <ScrollView
        className="tab__pages"
        scrollY
        onScrollToLower = {refresh}
        style={{height: getScrollHeight(174) + 'rpx'}}
      >

        <View key="all" className={tabPageClass("all")}>all</View>
        <View key="song" className={tabPageClass("song")}>
          <Song 
            songInfo= {songInfo}
            pushPlayList = {pushPlayList}
          />
        </View>
        <View key="playList" className={tabPageClass("playList")}>playList</View>
        <View key="video" className={tabPageClass("video")}>video</View>
        <View key="songner" className={tabPageClass("songner")}>songner</View>
        <View key="album" className={tabPageClass("album")}>album</View>
        <View key="djRadio" className={tabPageClass("djRadio")}>djRadio</View>
        <View key="user" className={tabPageClass("user")}>user</View>
        <View key="mv" className={tabPageClass("mv")}>mv</View>
      </ScrollView>
      {
        song && <AudioControl song = {song} preSong = {preSong} isPlay = {isPlay} songList = {playSongList} togglePlay = {togglePlay}  />
      }
    </View>
  )
}

SearchResult.config = {
  navigationBarTitleText: '搜索结果'
}


export default connect(
  state => ({
    ...state.homeReducer,
    ...state.songReducer,
    ...state.songListReducer
  }),
  dispatch => ({
    loadingSearch: data => {
      dispatch(getSearch(data))
    },
    togglePlay : value => {
      dispatch(togglePlay(value))
    },
    pushPlayList: value => {
      dispatch(pushPlayList(value))
    }
  })
  
  )(SearchResult)