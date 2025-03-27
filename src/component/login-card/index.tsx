import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import themestyles from '../../assets/styles/themestyles'

type TCardProps={
  title:string
}
const LoginCard = ({title}:TCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default LoginCard

const styles = StyleSheet.create({
  container:{
    backgroundColor:themestyles.COLOR_WHITE,
    height:400,
    width:'80%',
    borderRadius:10,
    alignSelf:"center",
    padding:25,
    elevation:2,
    alignItems:'center'
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    color:'black',
    alignSelf:'center'
  }
})