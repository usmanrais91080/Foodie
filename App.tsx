import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthStack } from './src/navigation/auth-stack'
import MainStack from './src/navigation/main-stack'

const App = () => {
  return (
    <NavigationContainer>
      {/* <AuthStack/> */}
      <MainStack/>
    </NavigationContainer>
  )
}

export default App