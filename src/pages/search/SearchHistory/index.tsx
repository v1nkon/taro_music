import Taro, { useState, useDidShow, useEffect, useCallback } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, Text, ScrollView} from '@tarojs/components'
import './index.less'

import {pushKeywordIntoStorage, getKeywordFromStorage, clearKeywordInStorage} from '@/utils/index'

function SearchHistory(props){

  let [searchKeyWords, setSearchKeywords] = useState<Array<string>>([])

  useEffect(() => {
    
  }, [])

  useDidShow(() => {
    setSearchKeywords(getKeywordFromStorage())
  })

  let clearSearchHistory = useCallback( () => {
    setSearchKeywords([])
    clearKeywordInStorage()
  } , [])
  
  return (
    <View className="components__searchhistory">
      <View className="searchhistory__title">
        <Text className="txt">搜索历史</Text>
        <Text className="iconfont icon-shanchu icon" onClick={clearSearchHistory}></Text>
      </View>
      <ScrollView className="searchhistory__list">
        {
          searchKeyWords.map(keyword => {
            return(
              <View className="list__item" key={keyword}>
                {keyword}
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )

}
SearchHistory.options = {
  addGlobalClass: true,
}
export default SearchHistory