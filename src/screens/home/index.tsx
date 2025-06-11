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
import React, {useCallback, useMemo, useState} from 'react';
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
  useGetCategories,
  useGetMealByCategory,
  useGetChocolateData,
  useGetSoupData,
} from '../../api/queries';

import themestyles from '../../assets/styles/themestyles';
import images from '../../assets';
import HomeSkeletonLoader from '../../component/home-skeleton-loader';
import {TCategoryItem} from '../../component/categories';
import Loader from '../../component/loader';

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
  const [selectedCategory, setSelectedCategory] = useState('Beef');
  const {data: allProducts, isLoading, error} = useGetBurger();
  const {data: saladData} = useGetSalad();
  const {data: lambData} = useGetLambData();
  const {data: chickenData} = useGetChickenData();
  const {data: beefData} = useGetBeefData();
  const {data: desertData} = useGetDesertData();
  const {data: fishData} = useGetFishData();
  const {data: chocolateData} = useGetChocolateData();
  const {data: soupData} = useGetSoupData();
  const {data: categories = []} = useGetCategories();
  const {data: meals = [], isLoading: isMealsLoading} =
    useGetMealByCategory(selectedCategory);

  const [expandDeserts, setExpandDeserts] = useState(false);
  const navigation = useNavigation<NavigationProps>();

  const handleViewMore = () => {
    setExpandDeserts(expandDeserts => !expandDeserts);
  };

  // isme 'All' category ka logic add kiya h
  const CATEGORIES_ITEMS = useMemo(
    () => [
      {
        id: 'all',
        title: 'All',
      },
      ...categories.map((item: any) => ({
        id: item.idCategory,
        title: item.strCategory,
        image: {uri: item.strCategoryThumb},
      })),
    ],
    [categories],
  );

  // ye category ko seletct krne k liye h title k base pr category seletec hogi or data show hoga
  const handleCategorySelect = (item: TCategoryItem, index: number) => {
    setSelectedCategory(prev => (prev === item.title ? '' : item.title));
    setTimeout(() => setSelectedCategory(item.title), 0); // force rerender
  };

  // ye is liye h jab categroy me 'All' select hoga to beef,chicken etc sb data show hoga
  const showAllMeals = useMemo(() => {
    if (selectedCategory === 'All') {
      return [
        ...(beefData ?? []),
        ...(chickenData ?? []),
        ...(lambData ?? []),
        ...(saladData ?? []),
        ...(fishData ?? []),
        ...(desertData ?? []),
        ...(allProducts ?? []),
      ];
    }
    return meals;
  }, [
    selectedCategory,
    beefData,
    chickenData,
    lambData,
    saladData,
    fishData,
    desertData,
    allProducts,
    meals,
  ]);

  const displayedMeals = showAllMeals;

  const renderMealItem = useCallback(
    ({item}) => (
      <View style={styles.imageCardContainer}>
        <ImageCard
          id={item.idMeal}
          title={item.strMeal}
          imageUrl={item.strMealThumb}
          price={item.price}
          description={item.strInstructions}
          review={item.review}
          onPress={() =>
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
            })
          }
        />
      </View>
    ),
    [navigation],
  );

  const renderSeparator = useCallback(() => <View style={{width: 13}} />, []);

  const handleNavigation = useCallback(
    function navigateToDetailScreen(item) {
      () =>
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
    },
    [navigation],
  );

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
                  items={CATEGORIES_ITEMS}
                  defaultSelectedIndex={0}
                  onSelect={handleCategorySelect}
                />
              </View>

              {/* yhna lgoic add kia h jab All select krn ge ty ye sara data show hoga or jab beef,chicken etc tu dusra */}
              {selectedCategory === 'All' ? (
                <>
                  <View style={styles.popularTextContainer}>
                    <Text style={styles.popularText}>Lamb Menu</Text>
                    <TouchableOpacity>
                      <Text style={styles.viewMoreText}>View More</Text>
                    </TouchableOpacity>
                  </View>

                  {error && <Text>Something went wrong!</Text>}
                  <FlatList
                    horizontal
                    ItemSeparatorComponent={renderSeparator}
                    showsHorizontalScrollIndicator={false}
                    data={lambData}
                    renderItem={renderMealItem}
                    initialNumToRender={8}
                    maxToRenderPerBatch={5}
                    windowSize={10}
                  />

                  {/* salad data */}
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
                      ItemSeparatorComponent={renderSeparator}
                      renderItem={renderMealItem}
                      initialNumToRender={5}
                    />
                  ) : (
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={saladData?.slice(0, 4)}
                      keyExtractor={(item, index) => `desert-preview-${index}`}
                      ItemSeparatorComponent={renderSeparator}
                      renderItem={renderMealItem}
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
                    ItemSeparatorComponent={renderSeparator}
                    renderItem={renderMealItem}
                  />

                  <View style={styles.popularTextContainer}>
                    <Text style={styles.popularText}>Soup</Text>
                    <TouchableOpacity>
                      <Text style={styles.viewMoreText}>View More</Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    horizontal
                    data={soupData}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => `popular-${index}`}
                    ItemSeparatorComponent={renderSeparator}
                    renderItem={renderMealItem}
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
                    ItemSeparatorComponent={renderSeparator}
                    renderItem={renderMealItem}
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
                    ItemSeparatorComponent={renderSeparator}
                    renderItem={renderMealItem}
                  />

                  <View style={styles.popularTextContainer}>
                    <Text style={styles.popularText}>Chocolates</Text>
                    <TouchableOpacity>
                      <Text style={styles.viewMoreText}>View More</Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    horizontal
                    data={chocolateData}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => `popular-${index}`}
                    ItemSeparatorComponent={renderSeparator}
                    renderItem={renderMealItem}
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
                    ItemSeparatorComponent={renderSeparator}
                    renderItem={renderMealItem}
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
                    ItemSeparatorComponent={renderSeparator}
                    renderItem={renderMealItem}
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
                    ItemSeparatorComponent={renderSeparator}
                    renderItem={renderMealItem}
                  />
                </>
              ) : (
                <>
                  <View style={styles.mealsSection}>
                    {isMealsLoading ? (
                      <Loader loading />
                    ) : meals.length === 0 ? (
                      <Text style={styles.noFoodText}>No food available</Text>
                    ) : (
                      <FlatList
                        scrollEnabled={false}
                        data={displayedMeals}
                        numColumns={2}
                        keyExtractor={item => item.idMeal}
                        columnWrapperStyle={styles.columnWrapper}
                        renderItem={({item}) => (
                          <TouchableOpacity
                            style={styles.mealCard}
                            onPress={handleNavigation}>
                            <Image
                              source={{uri: item.strMealThumb}}
                              style={styles.image}
                            />
                            <View style={styles.spacing}>
                              <Text style={styles.mealName}>${item.price}</Text>
                              <Text style={styles.mealName}>
                                {item.strMeal.substring(0, 15) + '...'}
                              </Text>
                              <Text
                                style={styles.description}
                                numberOfLines={1}>
                                {item.strInstructions?.substring(0, 20) + '...'}
                              </Text>
                              <Text style={styles.price}>⭐{item.review}</Text>
                            </View>
                          </TouchableOpacity>
                        )}
                      />
                    )}
                  </View>
                </>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};

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
  columnWrapper: {
    justifyContent: 'space-around',
    marginTop: 6,
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
  mealsSection: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  noFoodText: {
    fontSize: 14,
    color: 'rgba(114, 114, 114, 0.87)',
    alignSelf: 'center',
    marginTop: 60,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mealCard: {
    width: themestyles.SCREEN_WIDTH * 0.4,
    borderRadius: 7,
    backgroundColor: themestyles.SECONDARY,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1.4},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 4,
    paddingBottom: 5,
    marginTop: 8,
  },
  image: {
    height: 100,
    width: themestyles.SCREEN_WIDTH * 0.4,
    borderRadius: 4,
  },
  spacing: {
    paddingHorizontal: 5,
    flexDirection: 'column',
    gap: 3,
    marginTop: 3,
  },
  mealImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '500',
  },
  price: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 5,
    marginLeft: 5,
  },
  description: {
    fontSize: 12,
    justifyContent: 'flex-start',
    paddingLeft: 5,
    marginTop: 5,
    fontWeight: '300',
    color: themestyles.DARK_GREY3,
  },
});

export default React.memo(Home);
