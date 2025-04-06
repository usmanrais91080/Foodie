import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import themestyles from '../../assets/styles/themestyles'
import Icon from 'react-native-vector-icons/MaterialIcons'

type THeaderProps={
  onPress?:()=>void
}
const Header = ({onPress}:THeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
      <Icon name="arrow-back" size={25} color="black"/>
      </TouchableOpacity>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        paddingTop:themestyles.SCREEN_HEIGHT*0.08,
        paddingHorizontal:10
    }
})