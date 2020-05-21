import {Component, useCallback, useEffect, useState, useRef} from '@tarojs/taro'
import { View, Image, Slider, ScrollView, Text } from '@tarojs/components'
import classnames from 'classnames'
import './index.less'

import loop_mode from "@/images/song/icn_loop_mode.png"
import one_mode from "@/images/song/icn_one_mode.png"
import shuffle_mode from "@/images/song/icn_shuffle_mode.png"
import pre_song from "@/images/song/ajh.png"
import next_song from "@/images/song/ajb.png"
import stop_song from "@/images/song/ajd.png"
import start_song from "@/images/song/ajf.png"

import SongSlide from "@/components/SongSlide"
import { Song } from '@/constants/interface'
import { isSameSong, secondFormat, formatLyric, getScrollHeight } from '@/utils/index'
import innerAudioContext, { onPlay, offPlay, onEnded, offEnded, audioTogglePlay, audioToggleSong } from "@/utils/innerAudioContext"

interface OwnProps{
  song:Song,
  preSong:Song,
  songList:Array<Song>
  songListIds:Array<number>
  isPlay:boolean,
  togglePlay:Function
  setShowLyric: Function
  showLyric: boolean
  loadingSongDetail:Function
}

interface LYRIC{
  time:string
  word:string
  id:string
}


function Audio(props:OwnProps){
  let { song, preSong, songList, isPlay, togglePlay, setShowLyric, showLyric } = props

  let [curLong, setCurLong] = useState(0)
  let [isChanging, setIsChanging] = useState(false)
  let [songLyric, setSongLyric] = useState<Array<LYRIC>>([])
  let [viewId, setViewId] = useState("z1")
  let [showMusicList, setShowMusicList] = useState(false)


  useEffect( () => {
    if( song && song.url ){
      
      setSongLyric( formatLyric(song.lyric!) )
      innerAudioContext.src = song.url
      setCurLong(0)
      // if(isSameSong(song, preSong)){
      //   innerAudioContext.stop()
      //   innerAudioContext.seek( innerAudioContext.currentTime )
      //   setTimeout(()=>{
      //     innerAudioContext.play()
      //   }, 100)
      // }
      togglePlay(true)
    }else if(song && !song.url){
      setCurLong(0)
      Taro.showToast({
        title:'当前歌曲无权限\r 自动跳到下一首',
        icon:'none',
        duration:2000
      })
      setTimeout(()=>{
        audioToggleSong(1)
      },3000)
      
    }
  } , [song, preSong, setCurLong])


  let timeUpdate = useCallback(() => {
      isChanging || setCurLong( innerAudioContext.currentTime )
  }, [setCurLong, isChanging])

  useEffect( () => {
    onPlay()
    innerAudioContext && innerAudioContext.onTimeUpdate( timeUpdate )
    return () => {
    offPlay()
      innerAudioContext && innerAudioContext.offTimeUpdate( timeUpdate )
    }
  } ,[innerAudioContext, timeUpdate, onPlay, offPlay])

  useEffect( () => {
    offEnded()
    innerAudioContext && innerAudioContext.onEnded( audioToggleSong)
    return () => {
      innerAudioContext && innerAudioContext.offEnded( audioToggleSong )
      onEnded()
    }
  } , [innerAudioContext, audioToggleSong, offEnded, onEnded])




  let slideChange = useCallback( ({detail}) => {
    setCurLong( detail.value )
    innerAudioContext.stop()
    innerAudioContext.seek( detail.value )
    setIsChanging(false)
    setTimeout(()=>{
      innerAudioContext.play()
    }, 100)
  } , [song, setIsChanging, innerAudioContext])

  let slideChanging = useCallback( ({detail}) => {
    setCurLong( detail.value )
    setIsChanging(true)
  } , [song, setIsChanging, innerAudioContext])

  useEffect(()=>{

    let curId = "z" + Math.floor(curLong)

    let exist = songLyric.filter(lyric => {
      return lyric.id === curId
    }).length
    exist && setViewId(curId)
  }, [curLong, setViewId, songLyric])

  let toggleMusicList = useCallback( () => {
    setShowMusicList(pre => !pre)
  }, [setShowMusicList] )

  

  


  return(
    <View className={classnames("components__audio", {'high-zindex':showMusicList})}>
      <View onClick={setShowLyric && setShowLyric.bind({}, false)} className={classnames("components__audio-lyricbox", { 'show-lyric': showLyric })}>
        <ScrollView
          scrollY
          scrollIntoView={viewId}
          scrollWithAnimation={true}
          style={{height: getScrollHeight(350) + 'rpx'}}
        >
          {
            songLyric.map(lyric => {
              return(
                <View id={lyric.id} className={classnames("lyric-item",{ active: viewId === lyric.id })} key={lyric.time} data-time={lyric.time}>
                  {lyric.word}
                </View>
              )
            })
          }
        </ScrollView>
      </View>
      <View className="components__audio-bottom">
        <View className="components__audio-sliderbox">
          <View className="cur-time">
            { secondFormat(curLong) }
          </View>
          <Slider
            min = {0}
            max = {song.dt}
            className="components__audio-slider"
            value={curLong}
            blockSize = {15}
            activeColor="#d43c33"
            onChange={slideChange}
            onChanging={slideChanging}
          >
          </Slider>
          <View className="totoal-time">
            {song && secondFormat(song.dt!) || "00:00"}
          </View>
        </View>
        <View className="components__audio-operatorbox">
        <View className="components__audio-operator">
          <Image className="mode" src={loop_mode}></Image>
          <Image className="prev" onClick={audioToggleSong.bind({}, -1)} src={pre_song}></Image>
          <Image className="play" onClick={audioTogglePlay} src={ isPlay ? stop_song : start_song }></Image>
          <Image className="next" onClick={audioToggleSong.bind({}, 1)} src={next_song}></Image>
          <Text className="icon-musiclist iconfont music-list" onClick={toggleMusicList}></Text>
        </View>
      </View>
      </View>

      {showMusicList && <View
          className="components__audio-musiclist"
        >
          <SongSlide
            song={song} 
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

Audio.options = {
  addGlobalClass: true,
}

export default Audio