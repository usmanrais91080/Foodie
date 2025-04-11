import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useCallback } from 'react';
import themestyles from '../../assets/styles/themestyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

type THeaderProps = {
  onPress?: () => void;
};

const Header = ({ onPress }: THeaderProps) => {
  const navigation = useNavigation();

  const handleBack = useCallback(() => {
    if (onPress) {
      onPress(); // Custom logic
    } else {
      navigation.goBack(); // Default go back
    }
  }, [onPress, navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack}>
        <Icon name="arrow-back" size={25} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingTop: themestyles.SCREEN_HEIGHT * 0.08,
    paddingHorizontal: 10,
  },
});
