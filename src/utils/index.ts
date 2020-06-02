import Taro from '@tarojs/taro'
import store from "../store"
import { Song } from '@/constants/interface'


/**
 * 返回屏幕可用高度
 * // NOTE 各端返回的 windowHeight 不一定是最终可用高度（例如可能没减去 statusBar 的高度），需二次计算
 * @param {*} showTabBar
 */
export function getWindowHeight() {
  const info = Taro.getSystemInfoSync()
  const { windowHeight, windowWidth } = info
  return windowHeight
}


// 1rpx   320/750rpx
export function rpxToPx(rpx){
  const info = Taro.getSystemInfoSync()
  const { windowWidth } = info
  return rpx * (windowWidth / 750)
}

export function pxToRpx(px){
  const info = Taro.getSystemInfoSync()
  const { windowWidth } = info
  return px * (750 / windowWidth)
}

export function getScrollHeight(paddingTop:number):number {
  let scrollHeight = getWindowHeight()
  scrollHeight = scrollHeight - rpxToPx(paddingTop)
  scrollHeight = pxToRpx(scrollHeight)
  return scrollHeight
}


// 格式化播放次数
export const formatCount = (times) => {
  let formatTime: any = 0
  times = times ? Number(times) : 0
  switch (true) {
    case times > 100000000 :
      formatTime = `${(times / 100000000).toFixed(1)}亿`
      break
    case times > 100000 :
        formatTime = `${(times / 10000).toFixed(1)}万`
        break  
    default:
      formatTime = times    
  }
  return formatTime
}

//秒数转正规格式  80 => 01:20
export const secondFormat = (second:number) => {
  second = Math.round(second)
  let minute = Math.floor( second / 60 ),
    last = second % 60
  return minute >= 10 ? minute : '0' + minute + ':' +  (last >= 10 ? last : '0' + last)
}

//formatlyric  格式化歌词

export const formatLyric = (lyric:string) => {
  let lyricList = lyric.split("\n").slice(1)

  let newList = lyricList.map( (lyric) => {
    let index = lyric.indexOf(']'),
      time = lyric.slice(1, index),
      word = lyric.slice(index + 1),
      minute = parseInt(time.slice(0, 2)),
      second = parseInt(time.slice(3,5)),
      totleLong = minute * 60 + second
    return{
      time,
      word,
      id:"z"+ totleLong
    }
  } ).filter(cur => cur.word)

  return newList
}

//判断是否是同一首歌
export const isSameSong = (song:Song, preSong:Song) => {
  return preSong && ( song.id === preSong.id) || !preSong
}

//判断是否是请求新歌
export const notSameSongOrNotExist = ( songId: number ) => {
  let { songReducer } = store.getState()
  let {
    song
  } = songReducer
  return !song || ( song && song.id != songId )
}

// 存储搜索关键字
export const pushKeywordIntoStorage = (keyword: string) => {
  const searchKeyWord: Array<string> = Taro.getStorageSync('searchKeyWord') || []
  console.log('searchKeyWord', searchKeyWord)
  const index = searchKeyWord.findIndex((item) => item === keyword)
  if (index !== -1) {
    searchKeyWord.splice(index, 1)
  }
  searchKeyWord.unshift(keyword)
  Taro.setStorage({ key: 'searchKeyWord', data: searchKeyWord })
}

// 获取搜索关键字
export const getKeywordFromStorage = () : Array<string> => {
  return Taro.getStorageSync('searchKeyWord')
}

// 清除搜索关键字
export const clearKeywordInStorage = () => {
  Taro.removeStorageSync('searchKeyWord')
}