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
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {CategoriesCard, ImageCard, SearchBar} from '../../component';
import {
  useGetBurger,
  useGetSalad,
  useGetLambData,
  useGetChickenData,
  useGetBeefData,
  useGetDesertData,
  useGetFishData,
} from '../../api/queries';

import themestyles from '../../assets/styles/themestyles';
import images from '../../assets';
import HomeSkeletonLoader from '../../component/home-skeleton-loader';

type TProductProps = {
  id?: number;
  imageUrl: string | number;
  title: string;
  price: string;
  review?: number;
  description?: string;
  calories?: number;
  time?: number;
  ingredients?: {ingredient: string; measure: string}[];
  foodArea?: string;
};

export type MainStackParamList = {
  ProductDetailScreen: TProductProps;
};

type NavigationProps = StackNavigationProp<MainStackParamList>;

const Home = () => {
  const {data: allProducts, isLoading, error} = useGetBurger();
  const {data: saladData} = useGetSalad();
  const {data: lambData} = useGetLambData();
  const {data: chickenData} = useGetChickenData();
  const {data: beefData} = useGetBeefData();
  const {data: desertData} = useGetDesertData();
  const {data: fishData} = useGetFishData();

  const [expandDeserts, setExpandDeserts] = useState(false);
  const navigation = useNavigation<NavigationProps>();

  const handleViewMore = () => {
    setExpandDeserts(expandDeserts => !expandDeserts);
  };

  const categories = [
    {id: 1, title: 'All'},
    {id: 2, title: 'Lamb', image: images.lambMealImg},
    {id: 3, title: 'Salad', image: images.saladImg},
    {id: 4, title: 'Chicken', image: images.chickenMealImg},
    {id: 5, title: 'Beef', image: images.beefMealImg},
    {id: 6, title: 'Burger', image: images.burgerImg},
    {id: 7, title: 'Desert', image: images.desertImg},
    {id: 8, title: 'Ice-Cream', image: images.iceCreamImg},
  ];

  const handleCategorySelect = (item, index) => {};
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.contentContainer}>
        <View style={styles.container}>
          {isLoading ? (
            <HomeSkeletonLoader />
          ) : (
            <>
              <View style={styles.profileImageName}>
                <Image
                  source={images.defaultUserIcon}
                  style={styles.profileImage}
                />
                <Text>Welcome, Usman!</Text>
              </View>
              <Text style={styles.titleText}>Find Your Favourite Food</Text>
              <SearchBar />
              <Image source={images.promotionBanner} style={styles.banner} />
              <View style={styles.categoryContainer}>
                <Text style={styles.popularText}>Categories</Text>
                <CategoriesCard
                  items={categories}
                  defaultSelectedIndex={0}
                  onSelect={handleCategorySelect}
                />
              </View>

              <View style={styles.popularTextContainer}>
                <Text style={styles.popularText}>Lamb Menu</Text>
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
                      id={item.idMeal}
                      title={item.strMeal}
                      imageUrl={item.strMealThumb}
                      description={item.strInstructions}
                      price={item.price}
                      review={item.review}
                      onPress={() => {
                        navigation.navigate('ProductDetailScreen', {
                          id: item.idMeal,
                          title: item.strMeal,
                          imageUrl: item.strMealThumb,
                          price: item.price,
                          description: item.strInstructions,
                          review: item.review,
                          calories: item.calories,
                          time: item.time,
                          ingredients: item.ingredients,
                          foodArea: item.strArea,
                        });
                      }}
                    />
                  </View>
                )}
              />
              <View style={styles.desertTextContainer}>
                <Text style={styles.popularText}>Salad</Text>
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
                        id={item.idMeal}
                        title={item.strMeal}
                        imageUrl={item.strMealThumb}
                        price={item.price}
                        description={item.strInstructions}
                        calories={item.strIngredient1}
                        review={item.review}
                        onPress={() => {
                          navigation.navigate('ProductDetailScreen', {
                            id: item.idMeal,
                            title: item.strMeal,
                            imageUrl: item.strMealThumb,
                            price: item.price,
                            description: item.strInstructions,
                            calories: item.calories,
                            time: item.time,
                            review: item.review,
                            ingredients: item.ingredients,
                            foodArea: item.strArea,
                          });
                        }}
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
                        id={item.idMeal}
                        title={item.strMeal}
                        imageUrl={item.strMealThumb}
                        price={item.price}
                        description={item.strInstructions}
                        review={item.review}
                        onPress={() => {
                          navigation.navigate('ProductDetailScreen', {
                            id: item.idMeal,
                            title: item.strMeal,
                            imageUrl: item.strMealThumb,
                            price: item.price,
                            description: item.strInstructions,
                            calories: item.calories,
                            time: item.time,
                            ingredients: item.ingredients,
                            foodArea: item.strArea,
                            review: item.review,
                          });
                        }}
                      />
                    </View>
                  )}
                />
              )}

              <View style={styles.popularTextContainer}>
                <Text style={styles.popularText}>Desert</Text>
                <TouchableOpacity>
                  <Text style={styles.viewMoreText}>View More</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                horizontal
                data={desertData}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => `popular-${index}`}
                ItemSeparatorComponent={() => <View style={{width: 13}} />}
                renderItem={({item}) => (
                  <View style={styles.imageCardContainer}>
                    <ImageCard
                      id={item.idMeal}
                      title={item.strMeal}
                      imageUrl={item.strMealThumb}
                      price={item.price}
                      description={item.strInstructions}
                      review={item.review}
                      onPress={() => {
                        navigation.navigate('ProductDetailScreen', {
                          id: item.idMeal,
                          title: item.strMeal,
                          imageUrl: item.strMealThumb,
                          price: item.price,
                          description: item.strInstructions,
                          calories: item.calories,
                          time: item.time,
                          review: item.review,
                          ingredients: item.ingredients,
                          foodArea: item.strArea,
                        });
                      }}
                    />
                  </View>
                )}
              />

              <View style={styles.popularTextContainer}>
                <Text style={styles.popularText}>Chicken Menu</Text>
                <TouchableOpacity>
                  <Text style={styles.viewMoreText}>View More</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                horizontal
                data={chickenData}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => `popular-${index}`}
                ItemSeparatorComponent={() => <View style={{width: 13}} />}
                renderItem={({item}) => (
                  <View style={styles.imageCardContainer}>
                    <ImageCard
                      id={item.idMeal}
                      title={item.strMeal}
                      imageUrl={item.strMealThumb}
                      price={item.price}
                      description={item.strInstructions}
                      review={item.review}
                      onPress={() => {
                        navigation.navigate('ProductDetailScreen', {
                          id: item.idMeal,
                          title: item.strMeal,
                          imageUrl: item.strMealThumb,
                          price: item.price,
                          description: item.strInstructions,
                          calories: item.calories,
                          time: item.time,
                          review: item.review,
                          ingredients: item.ingredients,
                          foodArea: item.strArea,
                        });
                      }}
                    />
                  </View>
                )}
              />
              <View style={styles.popularTextContainer}>
                <Text style={styles.popularText}>Fish Menu</Text>
                <TouchableOpacity>
                  <Text style={styles.viewMoreText}>View More</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                horizontal
                data={fishData}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => `popular-${index}`}
                ItemSeparatorComponent={() => <View style={{width: 13}} />}
                renderItem={({item}) => (
                  <View style={styles.imageCardContainer}>
                    <ImageCard
                      id={item.idMeal}
                      title={item.strMeal}
                      imageUrl={item.strMealThumb}
                      price={item.price}
                      description={item.strInstructions}
                      review={item.review}
                      onPress={() => {
                        navigation.navigate('ProductDetailScreen', {
                          id: item.idMeal,
                          title: item.strMeal,
                          imageUrl: item.strMealThumb,
                          price: item.price,
                          description: item.strInstructions,
                          calories: item.calories,
                          time: item.time,
                          review: item.review,
                          ingredients: item.ingredients,
                          foodArea: item.strArea,
                        });
                      }}
                    />
                  </View>
                )}
              />

              <View style={styles.popularTextContainer}>
                <Text style={styles.popularText}>Beef Menu</Text>
                <TouchableOpacity>
                  <Text style={styles.viewMoreText}>View More</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                horizontal
                data={beefData}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => `popular-${index}`}
                ItemSeparatorComponent={() => <View style={{width: 13}} />}
                renderItem={({item}) => (
                  <View style={styles.imageCardContainer}>
                    <ImageCard
                      id={item.idMeal}
                      title={item.strMeal}
                      imageUrl={item.strMealThumb}
                      price={item.price}
                      description={item.strInstructions}
                      review={item.review}
                      onPress={() => {
                        navigation.navigate('ProductDetailScreen', {
                          id: item.idMeal,
                          title: item.strMeal,
                          imageUrl: item.strMealThumb,
                          price: item.price,
                          description: item.strInstructions,
                          calories: item.calories,
                          time: item.time,
                          review: item.review,
                          ingredients: item.ingredients,
                          foodArea: item.strArea,
                        });
                      }}
                    />
                  </View>
                )}
              />

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
                      id={item.idMeal}
                      title={item.strMeal}
                      imageUrl={item.strMealThumb}
                      price={item.price}
                      description={item.strInstructions}
                      review={item.review}
                      onPress={() => {
                        navigation.navigate('ProductDetailScreen', {
                          id: item.idMeal,
                          title: item.strMeal,
                          imageUrl: item.strMealThumb,
                          price: item.price,
                          description: item.strInstructions,
                          calories: item.calories,
                          time: item.time,
                          review: item.review,
                          ingredients: item.ingredients,
                          foodArea: item.strArea,
                        });
                      }}
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
        ? themestyles.SCREEN_HEIGHT * 0.07
        : themestyles.SCREEN_HEIGHT * 0.032,
  },
  contentContainer: {flex: 1, backgroundColor: 'white'},
  titleText: {
    fontSize: 32,
    fontWeight: '700',
    width: '70%',
  },
  profileImageName: {
    flexDirection: 'row',
    // gap:10
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
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
  categoryContainer: {
    marginTop: 10,
  },
  popularText: {
    fontSize: 17,
    fontWeight: '700',
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
