import * as ActionTypes from "../actionTypes"
import { Goods, Attribute, Brand, Gallery, Info, Issue } from "@/constants/interface";




interface GoodsState {
  allnumber: number
  attribute: Array<Attribute>
  brand:Array<Brand>
  gallery: Array<Gallery>
  info ?: Info
  iscollect:number
  issue: Array<Issue>
  productList:Array<Goods>
}


const initialState:GoodsState = {
  allnumber: 0,
  attribute: [],
  brand:[],
  gallery: [],
  info: undefined,
  iscollect:0,
  issue: [],
  productList:[],
}


const reducer = (state = initialState, action) => {
  switch(action.type){
    case ActionTypes.GETEDGOODSDETAIL:
      return{
        ...state,
        ...action.value
      };
    default:
      return state;
  }
}

export default reducer