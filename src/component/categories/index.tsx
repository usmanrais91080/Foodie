import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import themestyles from '../../assets/styles/themestyles';

export type TCategoryItem = {
  id: number;
  title: string;
  image?: any; 
};

type CategoriesCardProps = {
  items: TCategoryItem[];
  onSelect?: (item: TCategoryItem, index: number) => void;
  defaultSelectedIndex?: number;
};

const CategoriesCard: React.FC<CategoriesCardProps> = ({
  items,
  onSelect,
  defaultSelectedIndex = 0,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex);

  const handleSelect = (item: TCategoryItem, index: number) => {
    setSelectedIndex(index);
    onSelect?.(item, index);
  };

  const renderItem = ({item, index}: {item: TCategoryItem; index: number}) => {
    const isSelected = selectedIndex === index;
    return (
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: isSelected
              ? themestyles.PRIMARY
              : themestyles.COLOR_WHITE,
          },
        ]}
        onPress={() => handleSelect(item, index)}>
        {item.image && <Image source={item.image} style={styles.image} />}
        <Text
          style={[
            styles.title,
            {
              color: isSelected
                ? themestyles.COLOR_WHITE
                : themestyles.JET_BLACK,
              fontWeight: isSelected ? '600' : '500',
            },
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal
      data={items}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: themestyles.COLOR_WHITE,
    padding: 5,
    margin: 5,
    height: 40,
    shadowColor: themestyles.JET_BLACK,
    shadowOffset: {height: 2.5, width: 0},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    height: 35,
    width: 35,
    borderRadius: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
  },
});

export default CategoriesCard;
