import * as ActionTypes from "../actionTypes"

import { Song, Cover} from "@/constants/interface"


interface SongListState {
  song?:Song,
  isPlay:boolean
  showLyric:boolean
  preSong?:Song
}


const initialState:SongListState = {
  song:undefined,
  isPlay:false,
  showLyric:false,
  preSong:undefined
}


const reducer = (state = initialState, action) => {
  switch(action.type){
    case ActionTypes.GETEDSONGDETAIL:
      return{
        ...state,
        ...action.value
      };
    case ActionTypes.TOGGLEPLAY:
      return{
        ...state,
        isPlay: action.value ? action.value : !state.isPlay
      };
    case ActionTypes.SETSHOWLYRIC:
      return{
        ...state,
        showLyric: action.value
      }
    default:
      return state;
  }
}

export default reducer