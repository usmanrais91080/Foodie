import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback } from 'react';
import themestyles from '../../assets/styles/themestyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

type THeaderProps = {
  onPress?: () => void;
  title?: string;
  gap?: number; 
};

const Header = ({ onPress, title, gap = 10 }: THeaderProps) => {
  const navigation = useNavigation();

  const handleBack = useCallback(() => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  }, [onPress, navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={[styles.iconTitle, { columnGap: gap }]}>
        <Icon name="arrow-back" size={25} color="black" />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingTop: themestyles.SCREEN_HEIGHT * 0.05,
    // paddingHorizontal: 10,
  },
  iconTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: themestyles.COLOR_BLACK,
  },
});
