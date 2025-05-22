import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import themestyles from '../../assets/styles/themestyles';

type TButtonProps = {
  title?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  variant?: 'solid' | 'outline'; // support for outline/solid styles
};

const Button = ({title, onPress, variant = 'solid', style}: TButtonProps) => {
  const isOutline = variant === 'outline';

  return (
    <View style={{width: '100%'}}>
      <TouchableOpacity
        style={[
          styles.container,
          style,
          isOutline ? styles.outline : styles.solid,
        ]}
        onPress={onPress}
        activeOpacity={0.7}>
        <Text style={[styles.titleText, isOutline && styles.outlineText]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  solid: {
    backgroundColor: themestyles.PRIMARY,
  },
  outline: {
    borderWidth: 1,
    borderColor: themestyles.PRIMARY,
    backgroundColor: 'transparent',
  },
  titleText: {
    fontSize: 15,
    color: themestyles.COLOR_WHITE,
    fontWeight: '500',
  },
  outlineText: {
    color: themestyles.PRIMARY,
  },
});
