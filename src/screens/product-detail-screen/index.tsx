import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {MainStackParamList} from '../home';
import themestyles from '../../assets/styles/themestyles';
import ProdIngredients from './product-ingredients';
import ProductDesc from './product-descriptio';
import ProductHeader from '../../component/header/product-header';
import {Button} from '../../component';

const Tab = createMaterialTopTabNavigator();

const TopTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: {fontSize: 12, fontWeight: 'bold'},
        tabBarStyle: {backgroundColor: '#fff'},
        tabBarIndicatorStyle: {backgroundColor: '#e91e63'},
      }}>
      <Tab.Screen name="ProductDesc" options={{tabBarLabel: 'Description'}}>
        {() => <ProductDesc />}
      </Tab.Screen>
      <Tab.Screen name="ProdIngredients" options={{tabBarLabel: 'Ingredients'}}>
        {() => <ProdIngredients />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

type ProductDetailProps = RouteProp<MainStackParamList, 'ProductDetailScreen'>;

const ProductDetailScreen = () => {
  const [viewMore, setViewMore] = useState(false);
  const route = useRoute<ProductDetailProps>();
  const {
    title,
    imageUrl,
    price,
    description,
    review,
    calories,
    time,
    ingredients,
    foodArea,
  } = route.params;

  const DESCRIPTION_TEXT_LIMIT = 220;

  const toggleViewMore = () => {
    setViewMore(!viewMore);
  };

  const displayDescription = viewMore
    ? description
    : description.length > DESCRIPTION_TEXT_LIMIT
    ? `${description.slice(0, DESCRIPTION_TEXT_LIMIT)}...`
    : description;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
        <View style={styles.imageAndIconContainer}>
          <Image source={{uri: imageUrl}} style={styles.image} />
          <View style={styles.headerContainer}>
            <ProductHeader />
          </View>
        </View>

        <View style={styles.itemDetailsContainer}>
          <View style={styles.titlePrice}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>${price}</Text>
          </View>
          <Text style={styles.foodArea}>({foodArea})</Text>

          <View style={styles.detailsRowStyle}>
            <View style={styles.itemBg}>
              <Text style={styles.review}>⭐ {review}</Text>
            </View>
            <View style={styles.itemBg}>
              <Text style={styles.review}>🔥 {calories} Calories</Text>
            </View>
            <View style={styles.itemBg}>
              <Text style={styles.review}>⏰ {time} Mins</Text>
            </View>
          </View>
          <Text style={styles.instructionText}>Instruction</Text>
          <Text style={styles.description}>{displayDescription}</Text>
          {description?.length > DESCRIPTION_TEXT_LIMIT && (
            <TouchableOpacity onPress={toggleViewMore}>
              <Text style={styles.viewMoreText}>
                {viewMore ? 'Show Less' : 'View More'}
              </Text>
            </TouchableOpacity>
          )}

          {/* ingredients */}
          <Text style={styles.instructionText}>Ingredients</Text>
          <View style={styles.ingredientsContainer}>
            {Array.isArray(ingredients) ? (
              ingredients.map((item, index) => (
                <View key={index} style={styles.itemsBg}>
                  <Text style={styles.review}>{item.ingredient}</Text>
                  <Text key={index} style={styles.review}>
                    {item.measure}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={{color: 'red'}}>No ingredients found</Text>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title="Add to Cart"
          variant="outline"
          style={styles.button}
        />
        <Button title="Order Now" style={styles.button} />
      </View>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themestyles.COLOR_WHITE,
  },
  imageAndIconContainer: {
    position: 'relative',
  },
  headerContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 2,
  },
  image: {
    width: '100%',
    height: themestyles.SCREEN_HEIGHT / 2.2,
    position: 'relative',
  },
  backIcon: {
    position: 'absolute',
    top: 60,
    left: 13,
  },
  itemDetailsContainer: {
    marginTop: 15,
    paddingHorizontal: 15,
    flexDirection: 'column',
    gap: 8,
  },
  titlePrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  foodArea: {
    fontSize: 14,
    color: 'rgba(114, 114, 114, 0.87)',
    top: -8,
  },
  detailsRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  itemBg: {
    backgroundColor: 'rgba(230, 230, 230, 0.87)',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    paddingVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
  },
  review: {
    fontSize: 12,
    fontWeight: '500',
  },
  instructionText: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 8,
  },
  description: {
    fontSize: 13,
    color: themestyles.DARK_GREY3,
  },
  viewMoreText: {
    fontSize: 16,
    color: themestyles.PRIMARY,
    marginTop: 8,
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemsBg: {
    backgroundColor: 'rgba(230, 230, 230, 0.87)',
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    gap: 10,
    padding: 5,
    margin: 5,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: 'white',
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginLeft:15
  },
  button: {
    width: '90%',
  },
});
