import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './src/navigation/auth-stack';
import MainStack from './src/navigation/main-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* ye safeareprovider is liye use kiya h q k custom bottom tab k position ios and android me change ti  */}
      <SafeAreaProvider>
        <NavigationContainer>
          {/* <AuthStack/> */}
          <MainStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
