import * as ActionTypes from "../actionTypes"
import { Goods, Category } from '@/constants/interface'


interface HomeState {
  categoryList: Array<Category>
  categoryDetail?: Category
  goodsList:Array<Goods>
}


const initialState:HomeState = {
  categoryList: [],
  categoryDetail: undefined,
  goodsList: []
}


const reducer = (state = initialState, action) => {
  switch(action.type){
    case ActionTypes.GETEDCATEGORYLIST:
      return{
        ...state,
        ...action.value
      };
    case ActionTypes.GETEDCATEGORYDETAIL:
      return{
        ...state,
        ...action.value
      };
    case ActionTypes.GETEDGOODS:
      return{
        ...state,
        ...action.value
      };
    default:
      return state;
  }
}

export default reducer