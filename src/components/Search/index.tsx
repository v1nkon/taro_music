import Taro, { Component, useState, Config, render, useCallback } from '@tarojs/taro'
import { View, Input, SwiperItem, Image, Label, Text } from '@tarojs/components'
import classNames from 'classnames'
import './index.less'

interface OwnProps {
  count?: number
  keyword?:string
  inputChange?:(value: any) => void
  search?:(value: any) => void
  enableJump?:boolean
  autoFocus?: boolean
}

export default function Search(props:OwnProps){
  let { keyword = '', inputChange, search, enableJump = false, autoFocus = true } = props
  let [isFocus, setIsFocus] = useState(false)

  let jumpToSearch = useCallback( ( ) => {
    enableJump && Taro.navigateTo({
      url: `/pages/search/search`
    })
  }, [enableJump] ) 

  return (
    <View onClick={ jumpToSearch } className={ classNames("components__search", {'is-focus': !enableJump && (keyword.length !== 0 || isFocus) })}>
      <View className="search__input-box">
        <View className="search__bar">
          <Text className="search__input-icon"></Text>
          <Text className="search__input-label">搜索</Text>
          <Input value={keyword} disabled ={enableJump} autoFocus = {autoFocus} onInput= {inputChange} className="search__input-input" onFocus={setIsFocus.bind({}, true)} onBlur={setIsFocus.bind({}, false)} ></Input>
        </View>
      </View>
      <View onClick={search} className="search__input-btn">搜一下</View>
    </View>
  )

}