import { useMemo, useCallback, useState} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import './index.less'


import {Info} from "@/constants/interface"


interface OwnProps{
  info: Info
}

function GoodsList(props:OwnProps){

  let { info } = props

  let [styleMap, setStyleMap] = useState({})

  let images = useMemo( () => {
    let goods_desc = info && info.goods_desc
    if(goods_desc){
      let reg = /http.*?\.jpg/g
      let images = goods_desc.match(reg) || []

      images = images!.filter((image,index) => {
        return images!.indexOf(image) ===index
      })
      return images
    }
    return []
  } , [info])

  let getImgStyle = useCallback((index, e) => {
    setStyleMap( pre => ({
      ...pre,
      [index]: {
        height:e.detail.height + 'rpx',
        width:e.detail.width + 'rpx'
      }
    }) )
  }, [])


  return(
    <View className="goodsdetail__goodsimages">
      {
        images && images.map((img_url,index) =>{
          return(
            <View key={img_url} className="goodsdetail__goodsimages-item">
              <Image className="goodsdetail__goodsimages-img" onLoad={getImgStyle.bind({}, index)} lazyLoad = {true} style={styleMap[index]} src={img_url}></Image>
            </View>  
          )
        })
      }
    </View>
  )
}

export default GoodsList
