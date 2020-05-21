import * as ActionTypes from "../actionTypes"


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


interface HomeState {
  banners:Array<Banner>,
  recommands: Array<Recommand>
}


const initialState:HomeState = {
  banners: [],
  recommands: []
}


const reducer = (state = initialState, action) => {
  switch(action.type){
    case ActionTypes.GETEDHOMEDATA:
      return{
        ...state,
        ...action.value
      };
    default:
      return state;
  }
}

export default reducer