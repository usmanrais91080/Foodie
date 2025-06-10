import {Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import {Header} from '../../component';
import themestyles from '../../assets/styles/themestyles';

const ConfirmOrder = () => {
  return (
    <View style={styles.container}>
      <Header title="Confirm Order" fontWeight={'700'} />
    </View>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themestyles.COLOR_WHITE,
    paddingHorizontal: 15,
    paddingTop:
      Platform.OS === 'ios'
        ? themestyles.SCREEN_HEIGHT * 0.03
        : themestyles.SCREEN_HEIGHT * 0.032,
  },
});
