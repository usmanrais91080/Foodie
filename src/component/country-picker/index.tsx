import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import themestyles from '../../assets/styles/themestyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const COUNTRIES = ['Pakistan', 'United States', 'Dubai', 'Australia'];
const CountryPicker = () => {
  const [showModal, setShowModal] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [debounceSearch, setDebounceSearch] = useState('');

  const renderItemList = (item, index) => {
    return (
      <TouchableOpacity
        style={[
          styles.textContainer,
          {
            backgroundColor:
              selectedCountry == item ? themestyles.LIGHT_GREY2 : undefined,
          },
        ]}
        onPress={() => {
          setSelectedCountry(item);
          setShowModal(false);
        }}>
        <Text
          style={[
            styles.countryText,
            {fontWeight: selectedCountry === item ? '700' : undefined},
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  // useEffect(
  //   function handleDebounceSearch() {
  //     if (debounceSearch === '') {
  //       setCountryList(COUNTRIES);
  //     } else {
  //       const filtered = COUNTRIES.filter(item =>
  //         item.toLowerCase().includes(debounceSearch.toLowerCase()),
  //       );
  //       setCountryList(filtered);
  //     }
  //   },
  //   [debounceSearch],
  // );

  // useEffect(function clearDebounce(){
  //   const handler=setTimeout(() => {
  //     setDebounceSearch(searchQuery.trim())
  //   }, 300);
  //   return function cleanupTimeout(){
  //     cleanupTimeout(handler)
  //   }
  // },[searchQuery])

  useEffect(() => {
    const lowerCase = searchQuery.toLowerCase();
    setCountryList(
      COUNTRIES.filter(item => item.toLowerCase().includes(lowerCase)),
    );
  }, [searchQuery]);

  return (
    <View>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowModal(true)}>
        <Icon name="flag" size={22} />
        <Text style={styles.seletectCountryText}>
          {selectedCountry ?? 'Select Country'}
        </Text>
      </TouchableOpacity>
      <Modal visible={showModal} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.searchBar}>
                <Icon name="search" size={20} />
                <TextInput
                  placeholder="Search country"
                  style={styles.input}
                  placeholderTextColor={themestyles.COLOR_BLACK}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </TouchableOpacity>
              <FlatList
                data={countryList}
                renderItem={({item, index}) => renderItemList(item, index)}
              ListEmptyComponent={<Text style={styles.noCountrText}>No country found</Text>}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    backgroundColor: themestyles.LIGHT_GREY,
    fontSize: 16,
    lineHeight: 19.36,
    fontWeight: '400',
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '100%',
    height: themestyles.SCREEN_HEIGHT * 0.55,
    backgroundColor: themestyles.COLOR_WHITE,
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 30,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  seletectCountryText: {
    paddingLeft: 10,
    fontSize: 12.3,
  },
  countryText: {
    fontSize: 15,
    fontWeight: '500',
  },
  textContainer: {marginTop: 10, borderRadius: 5, padding: 8, paddingLeft: 8},
  searchBar: {
    backgroundColor: themestyles.LIGHT_GREY2,
    width: '100%',
    alignSelf: 'center',
    height: 40,
    borderRadius: 20,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
  },
  noCountrText:{
    fontSize:15,
    fontWeight:'500',
    alignSelf:'center',
    marginTop:5
  }
});

export default CountryPicker;
