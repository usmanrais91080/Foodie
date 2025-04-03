import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import themestyles from '../../assets/styles/themestyles'

type TButtonProps = {
    title?: string
    onPress?:()=>void
}
const Button = ({title,onPress}:TButtonProps) => {
  return (
    <View style={{width:"100%"}}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text>{title}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height:40,
        backgroundColor:themestyles.PRIMARY,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        marginBottom:20,
        marginTop:40
    }
})