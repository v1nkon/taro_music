import { ComponentClass } from 'react'
import Taro, { Component, Config, useEffect, useState, useMemo, useResize, useCallback } from '@tarojs/taro'
import { View, Button, Text, ScrollView, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import classname  from "classnames"


import './song.less'
import { isSameSongOrNotExist } from '@/utils/index'
import { loadingSongDetail, togglePlay } from "@/actions"


import aagPng from "@/images/aag.png"


import MyAudio from "@/components/Audio"


function Song(props){
  let {
    loadingSongDetail,
    song,
    preSong,
    songList,
    songListIds,
    playSongList,
    isPlay = false,
    togglePlay
  } = props

  let [showLyric, setShowLyric] = useState(false)

  useEffect(()=> {
    console.log('song-------song')
    // loadingSongDetail(1446522620)
    //如果当前歌曲不存在 且是请求新歌的时候  需要请求
    if( isSameSongOrNotExist(this.$router.params.songId) ){
      loadingSongDetail(this.$router.params.songId )
    }
  }, [])

  useEffect(()=>{
    song && Taro.setNavigationBarTitle({
      title: song.name
    });
  }, [song])

  

  let page__song = classname("page__song",{
    'is-play':isPlay,
    'show-lyric': showLyric
  })

  console.log("isplay")
  console.log(isPlay)

  console.log(song)

  return(
    <View className={page__song}>
      <Image className="page__song-bg" src={song && song.picUrl}></Image>
      <View className="page__song-top" onClick={setShowLyric && setShowLyric.bind({}, true)}>
        <View className="page__song-topbox">
          <Image className="page__song-topimg" src={aagPng}></Image>
          <View className="page__song-cover">
            <View className="page__song-center">
              <Image className="page__song-centerimg" src={song && song.picUrl}></Image>
            </View>
          </View>
        </View>
      </View>
      <MyAudio 
        song = {song}
        preSong = {preSong}
        playSongList = {playSongList}
        togglePlay = {togglePlay}
        isPlay = {isPlay}
        setShowLyric = {setShowLyric}
        showLyric = {showLyric}
        loadingSongDetail = {loadingSongDetail}
      />
    </View>
  )
}

Song.config = {
  navigationBarTitleText: '歌曲'
}


export default connect(
  state => ({
    ...state.songReducer,
    ...state.songListReducer,
    ...state.homeReducer
  }),
  dispatch => ({
    loadingSongDetail: data => {
      dispatch(loadingSongDetail(data))
    },
    togglePlay : value => {
      dispatch(togglePlay(value))
    }
  })
  
  )(Song)