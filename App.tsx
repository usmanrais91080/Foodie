import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './src/navigation/auth-stack';
import MainStack from './src/navigation/main-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {getAuth, onAuthStateChanged} from '@react-native-firebase/auth';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ToastProvider} from './src/component/toast';

const queryClient = new QueryClient();
const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function handleAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      {/* ye safeareprovider is liye use kiya h q k custom bottom tab k position ios and android me change ti  */}
      <ToastProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            {user ? <MainStack /> : <AuthStack />}
          </NavigationContainer>
        </SafeAreaProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default App;
