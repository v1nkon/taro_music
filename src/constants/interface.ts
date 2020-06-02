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

export interface Tab{
  name: string
  title: string
}

export interface Video{
  title: string
  vid: string
  coverUrl: string
  creator: Array<{
    userName: string
  }>
  durationms: number
  playTime: number
}

export interface User{
  nickname: string;
  userId: number;
  avatarUrl: string;
  gender: number;
  signature: string;
}

export interface DjRadio{
  name: string;
  id: number;
  picUrl: string;
  desc: string;
}

export interface PlayList{
  name: string;
  id: number;
  coverImgUrl: string;
  trackCount: number;
  playCount: number;
  creator: {
    nickname: string;
  };
}

export interface Album{
  name: string;
  id: number;
  publishTime: number;
  picUrl: string;
  artist: {
    name: string;
  };
  containedSong: string;
}

export interface Artist{
  name: string;
  id: number;
  picUrl: string;
  alias: Array<string>;
}



export interface SongInfo{
  songs:Array<Song>
  more: boolean
  moreText?: string;
}

export interface VideoInfo{
  videos: Array<Video>
  more: boolean
  moreText?: string;
}