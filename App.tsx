import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './src/navigation/auth-stack';
import MainStack from './src/navigation/main-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {/* <AuthStack/> */}
        <MainStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
