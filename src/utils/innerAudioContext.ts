import Taro from '@tarojs/taro'
import {Song} from "@/constants/interface"
// import { togglePlay, loadingSongDetail } from '@/actions'
import {togglePlay, loadingSongDetail} from "../store/actions"
import store from "../store"

const innerAudioContext = Taro.createInnerAudioContext()
innerAudioContext.autoplay = true


innerAudioContext.onCanplay(() => {
  let duration = innerAudioContext.duration;
  console.log('可以播放咯')
  console.log(duration)
})

export let audioTogglePlay = () => {
  let { songReducer } = store.getState()
  let {
    isPlay
  } = songReducer
  store.dispatch(togglePlay())
  innerAudioContext &&   (isPlay ? (innerAudioContext.pause() ) : (innerAudioContext.play() ))
}

export let audioToggleSong = (index = 1) => {
  let { songReducer, songListReducer, homeReducer } = store.getState()
  
  let {
    song,
  } = songReducer

  let {
    playSongListIds
  } = homeReducer

  audioTogglePlay()
  innerAudioContext.stop()

  index = isNaN(index) ? 1 : index
  let nextId
  if( index === 1 || index === -1 ){
    let songIndex = playSongListIds.indexOf(song.id) + index,
      totalLength = playSongListIds.length
    if( songIndex < 0 ){
      songIndex = songIndex + totalLength
    }else if(songIndex >= totalLength){
      songIndex = songIndex - totalLength
    }
    nextId = playSongListIds.slice(songIndex, songIndex + 1)[0]
  }else{
    nextId = index
  }
  store.dispatch(loadingSongDetail(nextId))

}


let audioOnPlay = () => {
  let duration = innerAudioContext.duration;
  console.log('开始播放')
  console.log(duration)
}

let audioOnCanplay = () => {
  let duration = innerAudioContext.duration;
  console.log('可以播放咯')
  console.log(duration)
}

export function onPlay(){

  innerAudioContext.onPlay(audioOnPlay)
  innerAudioContext.onCanplay(audioOnCanplay)
  innerAudioContext.pause()
  innerAudioContext.play()
}

export function offPlay(){
  // innerAudioContext.pause()
  innerAudioContext.offPlay( audioOnPlay )
  innerAudioContext.offCanplay( audioOnCanplay )
}



export function onEnded(){
  innerAudioContext.onEnded(audioToggleSong)
}
export function offEnded(){
  innerAudioContext.offEnded(audioToggleSong)
}

export default innerAudioContext