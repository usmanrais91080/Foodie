import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import themestyles from '../../assets/styles/themestyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type SearchProps = {
  Search: undefined;
};

type NavigationProps = StackNavigationProp<SearchProps>;
const SearchBar = () => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 25,
        marginTop: 25,
      }}>
      <TouchableOpacity
        style={styles.searchContainer}
        onPress={() => navigation.navigate('Search')}>
        <Icon name="search" size={25} color={themestyles.COLOR_GREY} />
        <Text style={styles.title}>Search for Food</Text>
        <Icon name="tune" size={25} color={themestyles.COLOR_GREY} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5}>
        <Icon name="notifications" size={45} color={themestyles.PRIMARY} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    height: 54,
    width: '83%',
    backgroundColor: themestyles.LIGHT_GREY,
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: 50,
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    fontSize: 13,
    paddingLeft: 10,
    color: themestyles.COLOR_GREY,
    flex: 1,
  },
});
