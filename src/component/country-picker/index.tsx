// import React, { useState } from 'react';
// import {
//   View, Text, Modal, TouchableOpacity, FlatList, StyleSheet
// } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import themestyles from '../../assets/styles/themestyles';
// // Define the list of countries
// const COUNTRY_LIST = ['Pakistan', 'India', 'USA', 'Canada', 'Germany'];

// type CountryPickerProps = {
//   selectedCountry?: string;
//   onSelect: (country: string) => void;
// };

// const CountryPicker: React.FC<CountryPickerProps> = ({ selectedCountry, onSelect }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selected, setSelected] = useState<string | null>(selectedCountry || null);

//   const handleSelect = (country: string) => {
//     setSelected(country); // Set selected country
//     onSelect(country); // Pass the selected country to parent
//     setModalVisible(false); // Close modal
//   };

//   return (
//     <View>
//       {/* Touchable input that opens the modal */}
//       <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
//         <Text style={selected ? styles.selectedText : styles.placeholderText}>
//           {selected || 'Select Country'}
//         </Text>
//         <MaterialIcons name="arrow-drop-down" size={24} color="black" />
//       </TouchableOpacity>

//       {/* Modal for country selection */}
//       <Modal visible={modalVisible} animationType="slide" transparent>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Select Country</Text>
//             <FlatList
//               data={COUNTRY_LIST}
//               keyExtractor={(item) => item}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={[styles.countryItem, selected === item && styles.selectedItem]}
//                   onPress={() => handleSelect(item)}
//                 >
//                   <Text style={styles.countryText}>{item}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//             <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
//               <Text style={styles.closeText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default CountryPicker;

// const styles = StyleSheet.create({
//   input: {
//     width: '100%',
//     height: 45,
//     backgroundColor: themestyles.LIGHT_GREY,
//     borderRadius: 5,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//   },
//   placeholderText: {
//     color: 'gray',
//   },
//   selectedText: {
//     color: 'black',
//     fontWeight: 'bold',
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   countryItem: {
//     width: '100%',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     alignItems: 'center',
//   },
//   selectedItem: {
//     backgroundColor: 'red', // Highlight selected country
//   },
//   countryText: {
//     fontSize: 16,
//   },
//   closeButton: {
//     marginTop: 15,
//     backgroundColor: 'black',
//     padding: 10,
//     borderRadius: 5,
//   },
//   closeText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import themestyles from '../../assets/styles/themestyles';
import Input from '../textinput';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TextInput} from 'react-native-gesture-handler';

type TCountryProps = {
  title: string;
  onPress?: () => void;
  letfIcon: React.ReactNode;
  rightIcon: React.ReactNode;
};

const COUNTRIES = ['Pakistan', 'United States', 'Dubai', 'Australia'];
const CountryPicker = ({title, onPress}: TCountryProps) => {
  const [showModal, setShowModal] = useState<boolean>(true);
  const [countryList, setCountryList] = useState<Array<string>>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const searchSchema = z.object({
    search: z.string().optional(),
  });

  type FormValue = z.infer<typeof searchSchema>;

  const {handleSubmit, control} = useForm<FormValue>({
    defaultValues: {
      search: '',
    },
    resolver: zodResolver(searchSchema),
  });

  useEffect(() => {
    const lowerCase = searchQuery.toLowerCase();
    setCountryList(
      COUNTRIES.filter(item => item.toLowerCase().includes(lowerCase)),
    );
  }, [searchQuery]);
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity style={styles.inputContainer}>
        <Text>Select Country</Text>
      </TouchableOpacity>
      <Modal visible={showModal} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View style={styles.modalContainer}>
            {/* Prevent clicks inside modal from closing it */}
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                {/* Search Input */}
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Search country"
                    value={searchQuery}
                    onChangeText={txt => setSearchQuery(txt)}
                  />
                </View>

                {/* Country List */}
                <FlatList
                  data={countryList}
                  keyExtractor={item => item}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={[
                        styles.countryContainer,
                        selectedCountry === item && {
                          backgroundColor: themestyles.LIGHT_GREY2,
                        },
                      ]}
                      onPress={() => {
                        setSelectedCountry(item);
                        // setShowModal(false);
                      }}>
                      <Text
                        style={{fontWeight: selectedCountry === item && '600'}}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default CountryPicker;

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
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    backgroundColor: themestyles.COLOR_WHITE,
    height: 500,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: {height: 2, width: 3},
    shadowOpacity: 0.2,
    overflow: 'hidden',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  countryContainer: {
    marginTop: 15,
    borderRadius: 5,
    padding: 5,
    paddingLeft: 5,
  },
});
