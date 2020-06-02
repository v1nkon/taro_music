import * as ActionTypes from "../actionTypes"
import { SongInfo, VideoInfo, Song } from "@/constants/interface"

interface Banner {
  targetId: number,
  pic: string
}
interface Recommand{
  id:number,
  picUrl: string
  playCount: number
  name: string
}

interface HotSearch{
  alg:string
  content: string
  iconType:number
  iconUrl?:string
  score:number
  searchWord:string
  source:number
  url: string
}




interface HomeState {
  banners:Array<Banner>,
  recommands: Array<Recommand>,
  hotSearch:Array<HotSearch>
  songInfo: SongInfo
  videoInfo: VideoInfo
  playSongList: Array<Song>
  playSongListIds: Array<string>
}


const initialState:HomeState = {
  banners: [],
  recommands: [],
  hotSearch:[],
  songInfo:{
    more: false,
    songs:[]
  },
  videoInfo:{
    more: false,
    videos: []
  },
  playSongList:[],
  playSongListIds: []
}


const reducer = (state = initialState, action) => {
  switch(action.type){
    case ActionTypes.GETEDHOMEDATA:
      return{
        ...state,
        ...action.value
      };
    case ActionTypes.GETHOTSEARCHED:
      return{
        ...state,
        hotSearch: action.value
      };
    case ActionTypes.GETSEARCHED:
      return{
        ...state,
        ...action.value
      };
    case ActionTypes.CLEARSEARCHED:
      return{
        ...state,
        songInfo:{
          more: false,
          songs:[]
        }
      };
    case ActionTypes.PUSHPLAYLIST:
      let curSong = Array.isArray(action.value) ? action.value : [action.value],
          curSongIds = curSong.map(cur => cur.id),
          preSong = state.playSongList,
          preSongIds = state.playSongListIds;
      
      curSongIds.map( (curId,index) => {
        if( preSongIds.indexOf(curId) === -1 ){
          preSong.push(curSong[index])
          preSongIds.push(curSongIds[index])
        }
      } )

      return{
        ...state,
        playSongList: preSong,
        playSongListIds: preSongIds
      }
    default:
      return state;
  }
}

export default reducer