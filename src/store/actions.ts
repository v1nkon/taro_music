import * as ActionTypes from './actionTypes'

export const loadingHomeData = value => ({type: ActionTypes.GETHOMEDATA, value})
export const loadedHomeData = value => ({type: ActionTypes.GETEDHOMEDATA, value})

export const loadingSongList = value => ({type: ActionTypes.GETSONGLIST, value})
export const loadedSongList = value => ({type: ActionTypes.GETEDSONGLIST, value})

export const loadingSongDetail = value => ({type: ActionTypes.GETSONGDETAIL, value})
export const loadedSongDetail = value => ({type: ActionTypes.GETEDSONGDETAIL, value})


export const togglePlay = (value = undefined) => ({type: ActionTypes.TOGGLEPLAY, value})
export const setShowLyric = (value) => ({type: ActionTypes.SETSHOWLYRIC, value})


export const getHotSearch = _ => ({type:ActionTypes.GETHOTSEARCH})
export const getHotSearched = value => ({type:ActionTypes.GETHOTSEARCHED, value})

export const getSearch = value => ({type:ActionTypes.GETSEARCH, value})
export const getSearched = value => ({type:ActionTypes.GETSEARCHED, value})
export const clearSearched = () => ({type:ActionTypes.CLEARSEARCHED})


export const pushPlayList = value => ({type:ActionTypes.PUSHPLAYLIST, value})