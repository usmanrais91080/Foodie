import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import themestyles from '../../assets/styles/themestyles';

type Props = {
  id?: number;
  imageUrl?: string | number;
  title: string;
  description?: string;
  price?: string | number;
  review?: number;
  calories?: number;
  onPress?: () => void;
};
const ImageCard = ({
  id,
  imageUrl,
  title,
  price,
  description,
  review,
  calories,
  onPress,
}: Props) => {

  const isRemote = typeof imageUrl === 'string'; // ye is liye use kiya h mtlb agr link h means uri h tu {uri:imageUri} use hoga oor agr require('/assets/image.....') is tra image h tu imageUri simple use hoga
  return (
    <TouchableOpacity
      style={styles.imageCardContainer}
      onPress={onPress}
      activeOpacity={0.5}>
      <Image
        resizeMode="cover"
        source={isRemote ? {uri: imageUrl} : imageUrl}
        style={styles.image}
      />
      <View style={styles.detailRow}>
        <Text style={styles.title}>{title.substring(0, 15) + '...'}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {description?.substring(0, 20) + '...'}
        </Text>
        <Text style={styles.price}>⭐{review}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  imageCardContainer: {
    width: themestyles.SCREEN_WIDTH * 0.4,
    borderRadius: 7,
    backgroundColor: themestyles.SECONDARY,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1.4},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 4,
    marginVertical: 5,
  },
  image: {
    height: 100,
    width: themestyles.SCREEN_WIDTH * 0.4,
    borderRadius: 4,
  },
  title: {
    fontSize: 15,
    justifyContent: 'flex-start',
    paddingLeft: 5,
    marginTop: 5,
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
  detailRow: {
    paddingHorizontal: 5,
    flexDirection: 'column',
    gap: 1.5,
    paddingVertical: 3,
  },
});

export default ImageCard;