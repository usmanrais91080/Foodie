import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import themestyles from '../assets/styles/themestyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomBottomTab = ({ state, navigation }: any) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route: any, index: any) => {
        const isFocused = state.index === index;

        const iconName =
          route.name === 'Home'
            ? 'home'
            : route.name === 'Profile'
            ? 'person'
            : route.name === 'Cart'
            ? 'shopping-cart'
            : 'sms';

        const handleOnPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={handleOnPress}
            style={[styles.tab, isFocused && styles.tabBg]}>
            <Icon
              name={iconName}
              size={30}
              color={isFocused ? themestyles.PRIMARY : themestyles.COLOR_WHITE}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomBottomTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themestyles.PRIMARY,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    height: Platform.OS === 'ios' ? 80 : 60, // adjust height for platform
  },
  tab: {
    alignItems: 'center',
    top:Platform.OS==='ios'?8:2
  },
  tabBg: {
    height: 40,
    width: 40,
    borderRadius: 4,
    backgroundColor: themestyles.COLOR_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
