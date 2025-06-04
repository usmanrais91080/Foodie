import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import Button from '../button';
import themestyles from '../../assets/styles/themestyles';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

type Item = {
  id: number;
  title?: string;
  description?: string;
  image?: any;
};

type CustomCarouselProps = {
  data: Item[];
  renderItem: ({item}: {item: Item}) => React.ReactElement;
  dotActiveColor?: string;
  dotInactiveColor?: string;
  dotSize?: number;
  dotSpacing?: number;
  height?: number;
};

type AuthStackParamList = {
  Login: undefined;
};

type NavigationProps = StackNavigationProp<AuthStackParamList>;

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  data,
  renderItem,
  dotActiveColor = 'green',
  dotInactiveColor = 'gray',
  dotSize = 10,
  dotSpacing = 6,
  height = Dimensions.get('window').height / 1.5,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation<NavigationProps>();

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const index = Math.round(x / width);
    setCurrentIndex(index);
  };

  return (
    <View>
      {/* Carousel */}
      <View style={{height}}>
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      </View>

      {/* Dots */}
      <View style={[styles.dotsContainer, {marginTop: dotSpacing}]}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                width: currentIndex === index ? dotSize * 1.5 : dotSize,
                height: dotSize,
                backgroundColor:
                  currentIndex === index ? dotActiveColor : dotInactiveColor,
              },
            ]}
          />
        ))}
      </View>
      {currentIndex === data.length - 1 && (
        <Button
          title="Next"
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        />
      )}
    </View>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    borderRadius: 20,
    marginHorizontal: 3,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 12,
    // width: '50%',
  },
  button: {
    width: '30%',
    position: 'absolute',
    right: 20,
    bottom: -themestyles.SCREEN_HEIGHT * 0.16,
  },
});
