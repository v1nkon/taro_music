import {Component, useCallback, useMemo} from '@tarojs/taro'
import { View, Button, Text, ScrollView } from '@tarojs/components'
import classNames from 'classnames'
import './index.less'

function SongSlide(props){

  let { isComponent = false, height = 0, closeFunction, toggleSong, song, songList, pushPlayList } = props

  let songslide__header = classNames("songslide__header",{
    "fixed":props.fixed
  })

  let jumpToDetail = useCallback( song =>{
    if( isComponent ){
      toggleSong(song.id)
    }else{
      pushPlayList(song)
      Taro.navigateTo({
        url: `/pages/song/song?songId=${song.id}`
      })
    }
  }, [isComponent])

  let pushAllIntoPlay = useCallback(() => {
    Taro.showToast({
      title:songList.length+'首歌加入播放列表',
      icon:'none',
      duration:2000
    })
    pushPlayList(songList)
  }, [songList])


  return(
    <View className={classNames("songslide__wrap", {'no-top':isComponent})}>
      <View className={songslide__header}>
        <View className="iconfont icon-Shape bofang" onClick={pushAllIntoPlay}></View>
        <View className="all" onClick={pushAllIntoPlay}>播放全部<Text className="count">(共{props.songList&&props.songList.length}首)</Text></View>
        {
          isComponent && <View onClick={closeFunction} className="close">X</View>
        }
      </View>
      <ScrollView
        scrollY={isComponent?true:false}
        style={{height:isComponent?height + 'rpx': ''}}
      >
        {
          songList && songList.map((curSong, index) => {
            return(
              <View className="songslide__item" key={curSong.name} onClick={jumpToDetail.bind({}, curSong)}>
                <View className="songslide__item-index">
                  {index+1}
                </View>
                <View className={classNames("songslide__item-info", {'is-cur':song && song.id ===curSong.id})}>
                  <View>
                    <View className="songslide__item-name">{curSong.name}</View>
                    <View className="songslide__item-desc">{curSong.songer} - {curSong.issue}</View>
                  </View>
                  <Text className="icon-right-copy iconfont songslide__item-more"></Text>
                </View>
              </View>
            )
          })
        }
        <View className="songslide__item last-index"></View>

      </ScrollView>
      
    </View>
  )
}

SongSlide.options = {
  addGlobalClass: true,
}

export default SongSlide