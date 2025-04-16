import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import themestyles from '../../assets/styles/themestyles';

type Props = {
  imageUrl: string | number;
  title: string;
  price: string | number;
  onPress: () => void;
};
const ImageCard = ({imageUrl, title, price, onPress}: Props) => {
  const isRemote = typeof imageUrl === 'string'; // ye is liye use kiya h mtlb agr link h means uri h tu {uri:imageUri} use hoga oor agr require('/assets/image.....') is tra image h tu imageUri simple use hoga
  return (
    <TouchableOpacity style={styles.imageCardContainer} onPress={onPress}>
      <Image
        source={isRemote ? {uri: imageUrl} : imageUrl}
        style={styles.image}
      />
      <Text>{title}</Text>
      <Text>{price}</Text>
    </TouchableOpacity>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  imageCardContainer: {
    height: 140,
    width: '40%',
    alignItems: 'center',
    borderRadius: 4,
    padding: 5,
    backgroundColor:themestyles.SECONDARY,

  },
  image:{height: 70, width: 88,resizeMode:'contain'}
});
