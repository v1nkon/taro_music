import Taro from '@tarojs/taro'
import {put, takeLatest, select} from 'redux-saga/effects'
import { Song } from '@/constants/interface'
import * as ActionTypes from './actionTypes'
import * as Actions from './actions'
import * as Api from '../api'



function* loadingHomeData(){

  const bannerRes = Api.getBanners()
  const recommandsRes = Api.getRecommands(6)

  const banners = yield bannerRes
  const recommands = yield recommandsRes


  yield put( Actions.loadedHomeData({
    banners:banners.banners,
    recommands:recommands.result,
  }) )
}

function* loadingSongList(action){
  const response = yield Api.getSongList(action.value)
  let { playlist = {} } = response
  let { 
    coverImgUrl,
    name,
    playCount,
    tags,
    creator,
    tracks,
    description
  } = playlist
  

  let songList:Array<Song> = []
  let songListIds:Array<Number> = []

  tracks.map(track => {

    let { id, name, ar, al } = track
    songList.push({
      id,
      name,
      songer: ar[0] && ar[0].name,
      issue: al.name
    })
    songListIds.push(id)

  })

  yield put( Actions.loadedSongList({
    cover:{
      coverImgUrl,
      name,
      playCount,
      tags,
      creator_avatar:creator.avatarUrl,
      creator_name:creator.nickname,
      description
    },
    songList,
    songListIds
  }) )
}

function* loadingSongDetail(action){

  const songRes = Api.getSongDeail(action.value)
  const urlRes = Api.getSongUrl(action.value)
  const lyricRes = Api.getSongLyric(action.value)

  const songDetail = yield songRes
  const songUrl = yield urlRes
  const songLyric = yield lyricRes


  let preSong = yield select(state => state.songReducer.song)

  let {
    al,
    id,
    name,
    ar,
    dt
  } = songDetail.songs[0]

  yield put( Actions.loadedSongDetail({
    song:{
      id,
      name,
      picUrl: al.picUrl,
      url: songUrl.data[0].url,
      lyric:songLyric.lrc.lyric,
      tlyric:songLyric.tlyric.lyric,
      dt:Math.round(dt / 1000),
      songer: ar && ar[0] && ar[0].name,
      issue: al.name,
    },
    preSong
  }) )
}



export default function* rootSaga(){
  yield takeLatest(ActionTypes.GETHOMEDATA, loadingHomeData)
  yield takeLatest(ActionTypes.GETSONGLIST, loadingSongList)
  yield takeLatest(ActionTypes.GETSONGDETAIL, loadingSongDetail)


}