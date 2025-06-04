import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import themestyles from '../../assets/styles/themestyles';
import images from '../../assets';
import CustomCarousel from '../../component/carousel';

const width = Dimensions.get('window').width;
const Carousel = () => {
  const DATA = [
    {
      id: 1,
      title: 'Foodie is Where Your Comfort Food Resides',
      description: 'Enjoy a fast and smooth food delivery at your doorstep',
      image: images.carouselImg1,
    },
    {
      id: 2,
      title: 'Track your  Comfort Food here',
      description:
        'Here You Can find a chef or dish for every taste and color. Enjoy!',
      image: images.carouselImg2,
    },
  ];

  return (
    <View style={styles.container}>
      <CustomCarousel
        data={DATA}
        renderItem={({item}) => (
         <View style={styles.itemsContainer}>
           <View style={{width}}>
            <Image style={styles.image} source={item.image}/>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
         </View>
        )}
        dotActiveColor={themestyles.PRIMARY}
        dotInactiveColor="#ccc"
        dotSize={12}
        dotSpacing={10}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themestyles.COLOR_WHITE,
    paddingTop:
      Platform.OS === 'ios'
        ? themestyles.SCREEN_HEIGHT * 0.1
        : themestyles.SCREEN_HEIGHT * 0.032,
  },
  image: {
    height: 400,
    width: 380,
  },
  itemsContainer: {
    flex:1,
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: themestyles.COLOR_BLACK,
    textAlign: 'center',
    width: '70%',
    alignSelf:'center'
  },
  description: {
    fontSize: 16,
    color: themestyles.COLOR_GREY,
    textAlign: 'center',
    width: '70%',
    alignSelf:"center",
    marginTop:5
  },
});
