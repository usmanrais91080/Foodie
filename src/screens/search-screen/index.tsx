import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import themestyles from '../../assets/styles/themestyles';
import { SearchBar } from 'react-native-screens';

const Search = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Find Your Favourite Food</Text>
       <SearchBar />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themestyles.COLOR_WHITE,
    paddingHorizontal: 15,
    paddingTop: themestyles.SCREEN_HEIGHT * 0.046,
  },
  titleText: {
    fontSize: 32,
    fontWeight: '700',
    width: '70%',
  },
});
