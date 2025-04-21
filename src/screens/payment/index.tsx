import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import themestyles from '../../assets/styles/themestyles';
import {Button, Header} from '../../component';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import images from '../../assets';

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
  const [selectedCard, setSelectedCard] = useState<null>(null);
  const navigation = useNavigation<NavigationProps>();

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

  const handleSelectedCard = item => {
    setSelectedCard(item.id);
  };
  const renderItems = (item: CardItem) => {
    return (
      <TouchableOpacity
        style={[
          styles.cardIconContainer,
          {
            borderColor:
              selectedCard === item.id ? themestyles.PRIMARY : undefined,
            borderWidth: selectedCard === item.id ? 0.9 : 0.4,
          },
        ]}
        onPress={() => handleSelectedCard(item)}>
        <Image
          source={item.icon}
          style={{height: 60, width: '40%', resizeMode: 'contain'}}
        />
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
          renderItem={({item, index}) => renderItems(item, index)}
        />
        <View style={{width: '90%', alignSelf: 'center', marginBottom: 30}}>
          <Button
            title="Next"
            onPress={() => navigation.navigate('ProfileImage')}
          />
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
  cardIconContainer: {
    width: '70%',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.4,
    // borderColor: themestyles.COLOR_GREY,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    // backgroundColor:themestyles.LIGHT_GREY,
    alignSelf: 'center',
  },
});
