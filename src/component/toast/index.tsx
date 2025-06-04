import React, {createContext, useContext, useState, useCallback} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import themestyles from '../../assets/styles/themestyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type ToastType = 'success' | 'error';

type ToastData = {
  type: ToastType;
  message: string;
  backgroundColor?: string;
};

type ToastContextType = {
  showToast: (data: ToastData) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [toast, setToast] = useState<ToastData | null>(null);
  const [visible, setVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const showToast = useCallback((data: ToastData) => {
    setToast(data);
    setVisible(true);

    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
        setToast(null);
      });
    }, 2000);
  }, []);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0], // slide in from bottom
  });

  const renderIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return (
          <MaterialIcons
            name="thumbs-up"
            size={18}
            color={themestyles.LIME_GREEN}
          />
        );
      case 'error':
        return <MaterialIcons name="warning" size={18} color="red" />;
      default:
        return null;
    }
  };

  return (
    <ToastContext.Provider value={{showToast}}>
      {children}
      {visible && toast && (
        <Animated.View
          style={[styles.toastContainer, {transform: [{translateY}]}]}>
          <View style={styles.messageContainer}>
            <Text
              style={[
                styles.toastText,
                {fontSize: toast.message.length > 20 ? 10 : 13},
              ]}>
              {toast.message}
            </Text>
            {renderIcon(toast.type)}
          </View>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const styles = StyleSheet.create({
  toastContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 40,
    padding: 14,
    // borderRadius: 8,
    alignItems: 'center',
    zIndex: 9999,
    elevation: 10,
    alignSelf: 'center',
    backgroundColor: themestyles.LIGHT_GREY3,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  toastText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 25,
  },
});
