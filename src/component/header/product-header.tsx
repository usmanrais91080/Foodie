import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
import themestyles from '../../assets/styles/themestyles';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

type THeaderProps = {
  onPress?: () => void;
};

const ProductHeader = ({onPress}: THeaderProps) => {
  const navigation = useNavigation();

  const handleBack = useCallback(
    function handleBack() {
      if (onPress) {
        onPress;
      } else {
        navigation.goBack();
      }
    },
    [onPress, navigation],
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.leftIconBg}>
          <TouchableOpacity onPress={handleBack} activeOpacity={0.6}>
            <Icon name="arrow-back" size={20} color="black" />
          </TouchableOpacity>
        </View>
        {/* right icons */}
        <View
          style={{
            marginLeft: themestyles.SCREEN_WIDTH * 0.68,
            flexDirection: 'row',
            gap: 15,
          }}>
          <View style={styles.iconBg}>
            <TouchableOpacity activeOpacity={0.6}>
              <Icon name="share" size={17} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.iconBg}>
            <TouchableOpacity activeOpacity={0.6}>
              <Icon name="favorite-border" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: themestyles.SCREEN_HEIGHT * 0.05,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftIconBg: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: themestyles.WHITE_OPAC_90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBg: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: themestyles.WHITE_OPAC_90,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProductHeader;
