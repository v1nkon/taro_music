import * as ActionTypes from "../actionTypes"

import { Song, Cover} from "@/constants/interface"


interface SongListState {
  songList: Array<Song>
  cover?: Cover
  songListIds: Array<Number>
}


const initialState:SongListState = {
  songList: [],
  cover: undefined,
  songListIds:[]
}


const reducer = (state = initialState, action) => {
  switch(action.type){
    case ActionTypes.GETEDSONGLIST:
      return{
        ...state,
        ...action.value
      };
    default:
      return state;
  }
}

export default reducer