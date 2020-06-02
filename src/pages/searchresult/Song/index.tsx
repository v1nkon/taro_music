import Taro, { Component, useState, Config, render, useCallback, useEffect } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, Text} from '@tarojs/components'
import './index.less'

import { SongInfo } from "@/constants/interface"



interface ownProps{
  songInfo:SongInfo
  pushPlayList:Function
}

function Song(props:ownProps){

  let { songInfo, pushPlayList } = props

  let jumpToDetail = useCallback( song =>{
    Taro.navigateTo({
      url: `/pages/song/song?songId=${song.id}`
    })
    pushPlayList(song)
  }, [])
  return (
    <View className="song__wrap">
      {
        songInfo && songInfo.songs.map(song => {
          return(
            <View className="song__item" key={song.id} onClick={jumpToDetail.bind({}, song)}>
              <View className="song__item-info">
                <View className="info-name">{song.name}</View>
                <View className="info-desc">{song.songer} - {song.issue}</View>
              </View>
              <Text className="icon-right-copy iconfont song-right"></Text>
            </View>
          )
        })
      }
    </View>
  )

}
Song.options = {
  addGlobalClass: true,
}
export default Song