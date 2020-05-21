import Taro, {useCallback} from '@tarojs/taro'
import { View, Image, ScrollView, Text } from '@tarojs/components'
import './index.less'

function RecommandList(props){

  let jumpToDetail = useCallback( recommandId =>{
    Taro.navigateTo({
      url: `/pages/songlist/songlist?recommandId=${recommandId}`
    })
  }, [])

  return (
    <View className="recommand">
      <View className="recommand__title">
        发现好歌单
        <View className="recommand__title-more">
          查看更多
        </View>
      </View>
      <ScrollView
        scrollX 
        className="recommand__list">
        {
          props.recommands && props.recommands.map(recommand => {
            return(
              <View className="recommand__list-item" onClick={jumpToDetail.bind({}, recommand.id)}  key={recommand.id}>
                <View className="recommand__list-wrap">
                  <Image className="recommand__list-img" src={recommand.picUrl}></Image>
                  <View className="recommand__list-icon">
                    <Text className="iconfont icon--music icon-music icon">
                    </Text>
                    {recommand.playCount ? (recommand.playCount / 10000 ).toFixed() : ''}万
                  </View>
                  <View className="recommand__list-name">{recommand.name}</View> 
                </View>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )

}

RecommandList.options = {
  addGlobalClass: true,
}
export default RecommandList