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
import {Controller, UseFormSetValue} from 'react-hook-form';
import themestyles from '../../assets/styles/themestyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useGetCountries} from '../../api/queries';
import Loader from '../loader';

type CountryPickerProps = {
  name: string;
  control: any;
  placeholder?: string;
  setValue: UseFormSetValue<any>;
};
const CountryPicker: React.FC<CountryPickerProps> = ({
  name,
  control,
  placeholder = 'Select Country',
  setValue,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [countryList, setCountryList] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const {data: countriesData, isLoading} = useGetCountries();

  useEffect(() => {
    if (!countriesData) return;
    const lowerCase = searchQuery.toLowerCase();
    const filtered = countriesData.filter((item: string) =>
      item.toLowerCase().includes(lowerCase),
    );
    setCountryList(filtered);
  }, [searchQuery, countriesData]);

  const renderItemList = (item: string) => (
    <TouchableOpacity
      style={styles.textContainer}
      onPress={() => {
        setValue(name, item); // set value to form
        setShowModal(false);
      }}>
      <Text style={styles.countryText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {value}, fieldState: {error}}) => (
        <>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setShowModal(true)}>
            <Icon name="flag" size={22} />
            <Text style={styles.seletectCountryText}>
              {value ? value : placeholder}
            </Text>
          </TouchableOpacity>

          {error && <Text style={styles.errorText}>{error.message}</Text>}

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
                  {isLoading ? (
                    <Loader loading />
                  ) : (
                    <FlatList
                      data={countryList}
                      renderItem={({item}) => renderItemList(item)}
                      keyExtractor={(item, index) => index.toString()}
                      ListEmptyComponent={
                        <Text style={styles.noCountrText}>
                          No country found
                        </Text>
                      }
                    />
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </>
      )}
    />
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
  noCountrText: {
    fontSize: 15,
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 10,
    textAlign: 'center',
  },
});

export default CountryPicker;
