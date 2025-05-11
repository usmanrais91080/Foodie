import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {ImageCard, SearchBar} from '../../component';
import {useGetBurger, useGetSalad, useGetLambData} from '../../api/queries';

import themestyles from '../../assets/styles/themestyles';
import images from '../../assets';
import HomeSkeletonLoader from '../../component/home-skeleton-loader';

const Home = () => {
  const {data: allProducts, isLoading, error} = useGetBurger();
  const {data: saladData} = useGetSalad();
  const {data: lambData} = useGetLambData();

  const [expandDeserts, setExpandDeserts] = useState(false);

  const handleViewMore = () => {
    setExpandDeserts(!expandDeserts);
  };
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {isLoading ? (
            <HomeSkeletonLoader />
          ) : (
            <>
              <Text style={styles.titleText}>Find Your Favourite Food</Text>
              <SearchBar />
              <Image source={images.promotionBanner} style={styles.banner} />

              <View style={styles.popularTextContainer}>
                <Text style={styles.popularText}>Popular Menu</Text>
                <TouchableOpacity>
                  <Text style={styles.viewMoreText}>View More</Text>
                </TouchableOpacity>
              </View>

              {error && <Text>Something went wrong!</Text>}
              <FlatList
                horizontal
                ItemSeparatorComponent={() => <View style={{width: 13}} />}
                showsHorizontalScrollIndicator={false}
                data={lambData}
                renderItem={({item}) => (
                  <View style={styles.imageCardContainer}>
                    <ImageCard
                      title={item.strMeal}
                      imageUrl={item.strMealThumb}
                      price={item.price}
                      onPress={() => {}}
                    />
                  </View>
                )}
              />
              <View style={styles.desertTextContainer}>
                <Text style={styles.popularText}>Deserts</Text>
                <TouchableOpacity onPress={handleViewMore}>
                  <Text style={styles.viewMoreText}>
                    {expandDeserts ? 'View Less' : 'View More'}
                  </Text>
                </TouchableOpacity>
              </View>

              {expandDeserts ? (
                <FlatList
                  key="expanded"
                  scrollEnabled={false}
                  showsHorizontalScrollIndicator={false}
                  numColumns={2}
                  columnWrapperStyle={{justifyContent: 'space-around'}}
                  contentContainerStyle={{paddingBottom: 10}}
                  data={saladData}
                  keyExtractor={(item, index) => `desert-${index}`}
                  ItemSeparatorComponent={() => <View style={{width: 13}} />}
                  renderItem={({item}) => (
                    <View style={styles.imageCardContainer}>
                      <ImageCard
                        title={item.strMeal}
                        imageUrl={item.strMealThumb}
                        price={item.price}
                        onPress={() => {}}
                      />
                    </View>
                  )}
                />
              ) : (
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={saladData?.slice(0, 4)}
                  keyExtractor={(item, index) => `desert-preview-${index}`}
                  ItemSeparatorComponent={() => <View style={{width: 13}} />}
                  renderItem={({item}) => (
                    <View style={styles.imageCardContainer}>
                      <ImageCard
                        title={item.strMeal}
                        imageUrl={item.strMealThumb}
                        price={item.price}
                        onPress={() => {}}
                      />
                    </View>
                  )}
                />
              )}

              <View style={styles.popularTextContainer}>
                <Text style={styles.popularText}>Burger Menu</Text>
                <TouchableOpacity>
                  <Text style={styles.viewMoreText}>View More</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                horizontal
                data={allProducts}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => `popular-${index}`}
                ItemSeparatorComponent={() => <View style={{width: 13}} />}
                renderItem={({item}) => (
                  <View style={styles.imageCardContainer}>
                    <ImageCard
                      title={item.strMeal}
                      imageUrl={item.strMealThumb}
                      price={item.price}
                      onPress={() => {}}
                    />
                  </View>
                )}
              />
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themestyles.COLOR_WHITE,
    paddingHorizontal: 15,
    paddingTop:
      Platform.OS === 'ios'
        ? themestyles.SCREEN_HEIGHT * 0.042
        : themestyles.SCREEN_HEIGHT * 0.032,
  },
  titleText: {
    fontSize: 32,
    fontWeight: '700',
    width: '70%',
  },
  popularTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  banner: {
    height: 150,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  popularText: {
    fontSize: 17,
    fontWeight: '500',
  },
  viewMoreText: {
    fontSize: 11,
    color: themestyles.DARK_GREY2,
  },
  imageCardContainer: {
    marginTop: 15,
    marginVertical: 4,
  },
  desertTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
});
