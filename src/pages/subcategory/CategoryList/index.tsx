import {Component} from '@tarojs/taro'
import { View, Button, Text, ScrollView } from '@tarojs/components'
import classNames from 'classnames'
import './index.less'

function SubcategorySlide(props){
  return(
    <ScrollView className="subcategory__slide"
      scrollX
    >
      {
        props.categoryList && props.categoryList.subList.map(subcategory => {
          let itemName = classNames('subcategory__slide-item',{
            'is-active': props.curSubCategoryId === subcategory.id,
          })
          return(
            <View className={itemName} onClick={props.chooseSubCategory.bind({},subcategory.id)} data-id={subcategory.id} key={subcategory.id}>{subcategory.name}</View>
          )
        })
      }
    </ScrollView>
  )
}


export default SubcategorySlide