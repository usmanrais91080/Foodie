import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import themestyles from '../../assets/styles/themestyles';

const ConversationScreen = () => {
  return (
    <View style={styles.container}>
        <Text>kjhk</Text>
      <View style={styles.headerBg}>

      </View>
    </View>
  );
};

export default ConversationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themestyles.COLOR_WHITE,
    paddingHorizontal: 15,
    paddingTop:
      Platform.OS === 'ios'
        ? themestyles.SCREEN_HEIGHT * 0.07
        : themestyles.SCREEN_HEIGHT * 0.032,
  },
  headerBg:{

  }
});
