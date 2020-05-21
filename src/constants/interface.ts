export interface Song{
  id: number    //歌曲id
  name: string  //歌曲名字
  songer?: string //歌手
  issue?: string  //专辑
  picUrl?:string  //封面图片
  dt?:number  // 歌曲长度 毫秒
  url?:string //歌曲地址
  lyric?:string //歌词
  tlyric?:string //翻译歌词
}

export interface Cover{
  coverImgUrl: string
  name: string,
  playCount: number
  tags: Array<string>
  creator_avatar: string
  creator_name: string
  description: string
}