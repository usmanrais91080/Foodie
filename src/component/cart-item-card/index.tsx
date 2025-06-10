import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import themestyles from '../../assets/styles/themestyles';

type TCartItem = {
  id: number;
  image: any;
  name: string;
  description: string;
  price: number | string;
  quantity: number;
};

type TCartItemCardProps = {
  items: TCartItem[];
  selectedItems: number[];
  onToggleItem: (id: number) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onDelete: (id: number) => void;
};

const CartItemCard = ({
  items,
  selectedItems,
  onToggleItem,
  onIncrement,
  onDecrement,
  onDelete,
}: TCartItemCardProps) => {
  const renderItemList = ({item}: {item: TCartItem}) => {
    const isSelected = selectedItems.includes(item.id);

    return (
      <View style={styles.container}>
        {/* checkbox */}
        <TouchableOpacity
          style={[
            styles.outerStyle,
            isSelected && {borderColor: themestyles.PRIMARY},
          ]}
          onPress={() => onToggleItem(item.id)}>
          {isSelected && (
            <Icon name="check" size={18} color={themestyles.PRIMARY} />
          )}
        </TouchableOpacity>

        <View style={styles.rowItem}>
          {/* image */}
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} />
          </View>

          {/* details */}
          <View style={styles.detailContainer}>
            <View style={styles.detailRowContainer}>
              <View style={styles.spaces}>
                <Text style={styles.price}>${item.price}</Text>
                <Text style={styles.title}>{item.name.substring(0,20)+'...'}</Text>
                <Text style={styles.description} numberOfLines={1}>
                  {item.description
                    ? item.description.substring(0, 15) + '...'
                    : 'No description'}
                </Text>

                <View style={styles.countContainer}>
                  <View style={styles.countSubContainer}>
                    <TouchableOpacity onPress={() => onDecrement(item.id)}>
                      <Text style={styles.minus}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.countTextContainer}>
                      <Text>{item.quantity.toString().padStart(2, '0')}</Text>
                    </View>
                    <TouchableOpacity onPress={() => onIncrement(item.id)}>
                      <Text style={styles.minus}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.deleteContainer}
                    onPress={() => onDelete(item.id)}>
                    <Icon name="delete" size={25} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={items}
      keyExtractor={it =>
        it.id !== undefined ? it.id.toString() : Math.random().toString()
      }
      renderItem={renderItemList}
      ItemSeparatorComponent={() => (
        <View style={{height: 0.7, backgroundColor: '#ccc', marginTop: 10}} />
      )}
    />
  );
};

export default CartItemCard;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center', gap: 10},
  rowItem: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 15,
    // backgroundColor:'green'
  },
  outerStyle: {
    borderWidth: 0.5,
    borderColor: 'rgba(148, 148, 148, 0.87)',
    height: 25,
    width: 20,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerStyle: {
    backgroundColor: themestyles.PRIMARY,
    height: 20,
    width: 15,
    borderRadius: 3,
  },
  imageContainer: {
    width: 150,
    height: 120,
  },
  detailContainer: {
    width: 220,
    height: 120,
    paddingRight: 25,
  },
  detailRowContainer: {
    marginLeft: 13,
    marginTop: 12,
  },
  spaces: {flexDirection: 'column', gap: 2},
  image: {
    width: 150,
    height: 120,
    borderRadius: 20,
  },
  price: {
    fontSize: 18,
    color: themestyles.PRIMARY,
    fontWeight: '600',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  description: {
    fontSize: 12,
    color: 'rgba(114, 114, 114, 0.87)',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(114, 114, 114, 0.87)',
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countSubContainer: {
    borderWidth: 0.5,
    borderColor: 'rgba(222, 222, 222, 0.87)',
    height: 35,
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    alignItems: 'center',
    borderRadius: 5,
  },
  minus: {
    fontSize: 20,
  },
  deleteContainer: {
    borderWidth: 0.5,
    borderColor: 'rgba(222, 222, 222, 0.87)',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    width: 39,
  },
  countTextContainer: {
    height: 35,
    backgroundColor: 'rgba(234, 234, 234, 0.87)',
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
