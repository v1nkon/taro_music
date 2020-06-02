import request from './request'


const HOST = `http://localhost:3000`

//首页数据
//获取banners
export const getBanners = (data = {}) => request({
  url:  HOST + '/banner?type=2',
  method: 'get',
  data
})
//获取推荐
export const getRecommands = (data = {}) => request({
  url:  HOST + '/personalized?limit='+ data,
  method: 'get',
  data
})


//获取song list
export const getSongList = (data = {}) => request({
  url:  HOST + '/playlist/detail?id='+data,
  method: 'get',
  data
})

//获取songDetail
export const getSongDeail = (data = {}) => request({
  url:  HOST + '/song/detail?ids='+data,
  method: 'get',
  data
})

//获取song_url
export const getSongUrl = (data = {}) => request({
  url:  HOST + '/song/url?id='+data,
  method: 'get',
  data
})

//获取song_lyric
export const getSongLyric = (data = {}) => request({
  url:  HOST + '/lyric?id='+data,
  method: 'get',
  data
})

//获取热门搜索
export const getHotSearch = (data = {}) => request({
  url:  HOST + '/search/hot/detail',
  method: 'get',
  data
})

//通过关键词搜索
export const getSearch = (data = {}) => request({
  url:  HOST + '/search',
  method: 'get',
  data
})


//分类详情
export const getCategoryDetail = (data = {}) => request({
  url:  HOST + '/category/detail',
  method: 'get',
  data
})

//商品列表 通过categoryId 获取goods
export const getGoodsList = (data = {}) => request({
  url:  HOST + '/goods/list',
  method: 'get',
  data
})

//商品详情 通过goodsId 获取goodsDetail
export const getGoodsDetail = (data = {}) => request({
  url:  HOST + '/goods/detail',
  method: 'get',
  data
})