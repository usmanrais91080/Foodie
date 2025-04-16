import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ImageCard, SearchBar} from '../../component';
import themestyles from '../../assets/styles/themestyles';
import images from '../../assets';

const Home = () => {
  const data=[
    {id:1,
    title:'usman',
    image:images.payPal,
    price:11
    },
    {id:2,
    title:'usman',
    image:images.payPal,
    price:13
    },
  ]
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Find Your Favourite Food</Text>
      <SearchBar />
      <Image source={images.promotionBanner} style={styles.banner} />
      <View style={styles.popularTextContainer}>
      <Text style={styles.popularText}>Popular Menu</Text>
      <TouchableOpacity>
        <Text style={styles.viewMoreText}>View More</Text>
      </TouchableOpacity>
      </View>
      <FlatList 
      data={data}
      renderItem={({item})=>(
        <ImageCard
        title={item.title}
        imageUrl={item.image}
        price={item.price}
        />
      )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themestyles.COLOR_WHITE,
    paddingHorizontal: 15,
    paddingTop: themestyles.SCREEN_HEIGHT * 0.07,
  },
  titleText: {
    fontSize: 32,
    fontWeight: '700',
    width: '70%',
  },
  popularTextContainer:{
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:'center',
    marginTop:20
  },
  banner: {
    height: 150,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  popularText:{
    fontSize:17,
    fontWeight:'500',
    
  },
  viewMoreText:{
    fontSize:11,
    color:themestyles.DARK_GREY2
  }
});
