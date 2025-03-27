import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthStack } from './src/navigation/auth-stack'

const App = () => {
  return (
    <NavigationContainer>
      <AuthStack/>
    </NavigationContainer>
  )
}

export default App