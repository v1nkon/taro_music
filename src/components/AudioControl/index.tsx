import {Component, useCallback, useEffect, useState, useRef} from '@tarojs/taro'
import { View, Image, Slider, ScrollView, Text } from '@tarojs/components'
import classnames from 'classnames'
import './index.less'


import SongSlide from "@/components/SongSlide"
import { Song } from '@/constants/interface'
import { secondFormat, formatLyric, getScrollHeight } from '@/utils/index'
import innerAudioContext, { audioTogglePlay, audioToggleSong } from "@/utils/innerAudioContext"

interface OwnProps{
  song:Song,
  preSong:Song,
  songList:Array<Song>
  isPlay:boolean,
  togglePlay:Function
}





function AudioComponents(props:OwnProps){
  let { song, preSong, togglePlay, isPlay, songList } = props

  let [showMusicList, setShowMusicList] = useState(false)

  useEffect( () => {
    if( song && song.url && (preSong && preSong.id != song.id) ){
      innerAudioContext.src = song.url
      togglePlay(true)
    }else if(song && !song.url){
      Taro.showToast({
        title:'当前歌曲无权限\r 自动跳到下一首',
        icon:'none',
        duration:2000
      })
      setTimeout(()=>{
        audioToggleSong(1)
      },1000)
      
    }
  } , [song, preSong, audioToggleSong, ])

  let toggleMusicList = useCallback( () => {
    setShowMusicList(pre => !pre)
  }, [setShowMusicList] ) 


  console.log(isPlay)

  return(
    <View className="components__audio-control">
      <View className="control-left">
        <Image className="control-img" src={song && song.picUrl!}></Image>
        <View>
          <View>{song.name}</View>
          <View className="control-desc">{song.songer} - {song.issue}</View>
        </View>
      </View>
      <View className="control-right">
        <Text onClick={audioTogglePlay} className={classnames("play", "iconfont", { 'icon-play-stop': isPlay, 'icon-play-stop1': !isPlay })}></Text>
        <Text onClick={toggleMusicList} className="icon-musiclist iconfont music-list"></Text>
      </View>
      {showMusicList && <View
        className="components__audio-musiclist"
      >
        <SongSlide 
          song = {song}
          songList = {songList}
          isComponent = {true}
          height={620}
          closeFunction = {toggleMusicList}
          toggleSong = { audioToggleSong }
        />
      </View>
    }
    </View>
  )
}

AudioComponents.options = {
  addGlobalClass: true,
}

export default AudioComponents