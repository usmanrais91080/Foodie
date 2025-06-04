import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import themestyles from '../../assets/styles/themestyles';
import {Button, DropDown, Header, SearchScreenSearchBar} from '../../component';

const Search = () => {
  const FOOD_DATA = useMemo(
    () => [
      {id: 1, title: 'Cake'},
      {id: 2, title: 'Soup'},
      {id: 3, title: 'Desert'},
      {id: 4, title: 'Burger'},
    ],
    [],
  );

 const LOCATION_DATA = useMemo(
  () => [
    { id: 1, title: 'Karachi' },
    { id: 2, title: 'Lahore' },
    { id: 3, title: 'Islamabad' },
    { id: 4, title: 'Rawalpindi' },
    { id: 5, title: 'Faisalabad' },
    { id: 6, title: 'Multan' },
    { id: 7, title: 'Peshawar' },
    { id: 8, title: 'Quetta' },
    { id: 9, title: 'Sialkot' },
    { id: 10, title: 'Gujranwala' },
    { id: 11, title: 'Bahawalpur' },
    { id: 12, title: 'Sargodha' },
    { id: 13, title: 'Hyderabad' },
    { id: 14, title: 'Sukkur' },
    ],
    [],
  );

  return (
    <ScrollView style={styles.container}>
      <Header/>
      <Text style={styles.titleText}>Find Your Favourite Food</Text>
      <SearchScreenSearchBar />
      <View style={styles.subContainer}>
        <View style={styles.spacing}>
          <DropDown title="Location" data={LOCATION_DATA}/>
          <DropDown title="Food" data={FOOD_DATA} />
        </View>
      </View>
      <View style={styles.button}>
        <Button title="Search" variant="solid" />
      </View>
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themestyles.COLOR_WHITE,
    paddingHorizontal: 15,
    paddingTop: themestyles.SCREEN_HEIGHT * 0.016,
  },
  titleText: {
    fontSize: 32,
    fontWeight: '700',
    width: '70%',
    marginTop:30
  },
  spacing: {
    gap: 25,
    marginTop: 10,
  },
  subContainer: {
    marginTop: 50,
  },
  button: {
    top: themestyles.SCREEN_HEIGHT * 0.37,
  },
});
