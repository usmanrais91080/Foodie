import React, {useCallback, useState} from 'react';
import {View, StyleSheet, Platform, Text, TouchableOpacity} from 'react-native';

import themestyles from '../../assets/styles/themestyles';
import {Button, CartItemCard, Header} from '../../component';
import useCartStore from '../../stores/useCartStore';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type MainStackParam = {
  ConfirmOrder: undefined;
};

type NavigationProps = StackNavigationProp<MainStackParam>;

const Cart = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const navigation = useNavigation<NavigationProps>();
  const {
    cart,
    increaseByQuantity,
    decreaseByQuantity,
    removeFromCart,
    clearCart,
  } = useCartStore();

  const handleNavigation = useCallback(
    function handleNavigation() {
      navigation.navigate('ConfirmOrder');
    },
    [navigation],
  );

  const toggleItemSelection = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  const isAllSelected = selectedItems.length === cart.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map(item => item.id));
    }
  };

  const handleIncrement = (id: number) => {
    increaseByQuantity(id);
  };

  const handleDecrement = (id: number) => {
    decreaseByQuantity(id);
  };

  const handleDelete = (id: number) => {
    removeFromCart(id);
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
  };

  const clearAllCart = () => {
    clearCart(selectedItems);
    setSelectedItems([]);
  };

  let delivery = 6;
  const getSubTotal = () => {
    let subTotal = 0;

    cart.map(item => {
      const quantity = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;
      subTotal += quantity * price;
    });
    return subTotal;
  };

  const getTotal = () => {
    const subTotal = getSubTotal();
    if (subTotal === 0) {
      return 0;
    }
    return getSubTotal() + delivery;
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {/* header */}
        <Header title="Order Details" gap={'30%'} fontWeight={'700'} />
        {/* Select All Checkbox */}
        <TouchableOpacity
          style={styles.selectAllContainer}
          onPress={toggleSelectAll}>
          <TouchableOpacity
            style={[
              styles.outerStyle,
              isAllSelected && {borderColor: themestyles.PRIMARY},
            ]}
            onPress={toggleSelectAll}>
            {isAllSelected && (
              <Icon name="check" size={18} color={themestyles.PRIMARY} />
            )}
          </TouchableOpacity>
          <Text style={styles.selectAllText}>Select All</Text>

          {/* 🗑️ Delete All Selected */}
          {selectedItems.length > 0 && (
            <TouchableOpacity onPress={clearAllCart}>
              <Icon name="delete" size={25} color={themestyles.PRIMARY} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        {/* cart items */}
        <CartItemCard
          items={cart}
          selectedItems={selectedItems}
          onToggleItem={toggleItemSelection}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onDelete={handleDelete}
        />
      </View>

      <View style={styles.bottomCard}>
        <View style={styles.subTotalContainer}>
          <Text style={styles.subtotal}>SubTotal</Text>
          <Text>{'$' + getSubTotal().toFixed(2)}</Text>
        </View>
        <View style={styles.deliveryContainer}>
          <Text style={styles.delivery}>Delivery</Text>
          <Text>{'$' + delivery}</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total</Text>
          <Text>{'$ ' + getTotal().toFixed(2)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Checkout" onPress={handleNavigation} />
        </View>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themestyles.COLOR_WHITE,
    paddingTop:
      Platform.OS === 'ios'
        ? themestyles.SCREEN_HEIGHT * 0.03
        : themestyles.SCREEN_HEIGHT * 0.032,
  },
  scrollStyle: {
    paddingBottom: 10,
  },
  subContainer: {paddingHorizontal: 8},
  bottomCard: {
    backgroundColor: themestyles.SECONDARY,
    height: 200,
    width: '100%',
    paddingHorizontal: 17,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: 'absolute',
    bottom: 0,
  },
  subTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 35,
  },
  deliveryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '700',
  },
  subtotal: {
    fontSize: 13,
    fontWeight: '500',
  },
  delivery: {
    fontSize: 13,
    fontWeight: '500',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  selectAllContainer: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    marginTop: 20,
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
  selectAllText: {
    fontSize: 16,
    flex: 0.9,
  },
});
