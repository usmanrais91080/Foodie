import React, { useCallback, useState, useEffect } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import themestyles from '../../assets/styles/themestyles';
import { Button, Header } from '../../component';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import images from '../../assets';
import { useToast } from '../../component/toast';

type AuthStackParamList = {
  BioScreen: undefined;
  ProfileImage: undefined;
};

type CardItem = {
  id: number;
  icon: any;
};

type NavigationProps = StackNavigationProp<AuthStackParamList>;

const PaymentScreen = () => {
  const [selectedCard, setSelectedCard] = useState<null | number>(null);
  const navigation = useNavigation<NavigationProps>();
  const { showToast } = useToast();

  const CARD_DETAILS: CardItem[] = [
    {
      id: 1,
      icon: images.payPal,
    },
    {
      id: 2,
      icon: images.visa,
    },
    {
      id: 3,
      icon: images.payoneer,
    },
  ];

  const handleSelectedCard = (id: number) => {
    setSelectedCard(id);
  };

  const handleOnPress = useCallback(() => {
    if (selectedCard === null) {
      showToast({
        type: 'error',
        message: 'Please select a payment method',
      });
      return;
    }
    navigation.navigate('ProfileImage');
  }, [selectedCard, navigation, showToast]);

  useEffect(() => {
  }, [selectedCard]); 

  const renderItems = ({ item }: { item: CardItem }) => {
    const isSelected = selectedCard === item.id;

    const cardStyle: ViewStyle = {
      borderColor: isSelected ? themestyles.PRIMARY : '#cccc',
      borderWidth: isSelected ? 0.9 : 0.4,
      width: '70%',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      marginVertical: 10,
      marginHorizontal: 20,
      alignSelf: 'center',
    };

    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={() => handleSelectedCard(item.id)}
      >
        <Image source={item.icon} style={styles.icon} />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header onPress={() => navigation.navigate('BioScreen')} />
        <Text style={styles.header}>Payment Method</Text>
        <Text style={styles.subHeader}>
          This data will be displayed in your account profile for security
        </Text>
        <FlatList
          scrollEnabled={false}
          data={CARD_DETAILS}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItems}
        />
        <View style={{ width: '90%', alignSelf: 'center', marginBottom: 30 }}>
          <Button title="Next" onPress={handleOnPress} />
        </View>
      </View>
    </ScrollView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themestyles.COLOR_WHITE,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '65%',
    alignSelf: 'center',
  },
  subHeader: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    width: '60%',
    alignSelf: 'center',
  },
  icon: {
    height: 60,
    width: '40%',
    resizeMode: 'contain',
  },
});
