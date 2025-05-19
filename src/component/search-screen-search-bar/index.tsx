import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';

import themestyles from '../../assets/styles/themestyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

type SearchProps = {
  borderRadius?: number;
};

const SearchScreenSearchBar: React.FC<SearchProps> = ({borderRadius = 50}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, {borderRadius}]}>
        <Icon name="search" size={25} color={themestyles.COLOR_GREY} />
        <TextInput placeholder="Search food" style={styles.input} />
        <TouchableOpacity>
          <Icon name="tune" size={25} color={themestyles.COLOR_GREY} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity activeOpacity={0.5}>
        <Icon name="notifications" size={45} color={themestyles.PRIMARY} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
    marginTop: 25,
  },
  searchContainer: {
    height: 54,
    width: '83%',
    backgroundColor: themestyles.LIGHT_GREY,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    fontSize: 13,
    paddingLeft: 10,
    color: themestyles.COLOR_GREY,
    flex: 1,
  },
  input: {
    flex: 1,
  },
});

export default SearchScreenSearchBar;
