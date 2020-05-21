// import { ComponentClass } from 'react'
import Taro, { useEffect, useState, useCallback } from '@tarojs/taro'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'


import './songlist.less'

import SongSlide from "@/components/SongSlide"
import AudioControl from "@/components/AudioControl"
import { loadingSongList, togglePlay } from '@/actions'
import { formatCount, getScrollHeight, pxToRpx } from "@/utils/index"


function SongList(props){
  let {
    loadingSongList,
    songList,
    cover = {},
    song,
    preSong,
    loadingSongDetail,
    songListIds,
    isPlay = false,
    togglePlay
  } = props

  let [ fixed, setFixed ] = useState(false)

  useEffect(() => {
    // loadingSongList(5019030512)
    loadingSongList(this.$router.params.recommandId)
  }, [])

  let onScroll = useCallback((e) => {
    let detail = e.detail,
      scrollTop = pxToRpx(detail.scrollTop)
    if( scrollTop > 430 ){
        !fixed && setFixed(true)
    }else{
      fixed && setFixed(false)
    }
  }, [fixed, setFixed])
  
  return(
    <ScrollView 
      className="page__songlist"
      scrollY
      style={{height: getScrollHeight(0) + 'rpx' }}
      onScroll = {onScroll}
    >
      <View className="page__songlist-header">
        <Image className="back-img"  src={cover.coverImgUrl}></Image>
        <View className="header-box">
          <View className="left-box">
            <Image className="left-img" src={cover.coverImgUrl}></Image>
            <View className="left-icon">
              <Text className="iconfont icon--music icon-music icon">
              </Text>
              {formatCount(cover.playCount)}
            </View>
          </View>
          <View className="right-intro">
            <View className="name">
              {cover.name}
            </View>
            <View className="avatar">
              <Image className="avatar-img" src={cover.creator_avatar}></Image>
              {cover.creator_name}
            </View>
            <View className="intro">
              {cover.description}
            </View>
          </View>
        </View>
        
        
      </View>
      <SongSlide 
        song = {song}
        songList = {songList}
        fixed = {fixed}
      />
      {
        song && <AudioControl song = {song} preSong = {preSong} isPlay = {isPlay} songList = {songList} togglePlay = {togglePlay} toggleSong = {loadingSongDetail}  />
      }
    </ScrollView>
  )
}

SongList.config = {
  navigationBarTitleText: '歌单'
}
SongList.options = {
  addGlobalClass: true,
}

export default connect(
  state => ({
    ...state.songListReducer,
    ...state.songReducer
  }),
  dispatch => ({
    loadingSongList: data => {
      dispatch(loadingSongList(data))
    },
    togglePlay : value => {
      dispatch(togglePlay(value))
    }
  })
  
  )(SongList)
