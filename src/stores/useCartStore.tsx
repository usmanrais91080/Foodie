// store/cartStore.ts
import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {zustandStorage} from '../hooks/useZustandStorage';

interface CartItem {
  id: number;
  image: any;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  increaseByQuantity: (id: number) => void;
  decreaseByQuantity: (id: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: item => {
        const cart = get().cart;
        const exists = cart.find(i => i.id === item.id);
        if (exists) {
          set({
            cart: cart.map(i =>
              i.id === item.id ? {...i, quantity: i.quantity + 1} : i,
            ),
          });
        } else {
          set({cart: [...cart, item]});
        }
      },

      removeFromCart: id =>
        set({cart: get().cart.filter(item => item.id !== id)}),

      increaseByQuantity: id =>
        set({
          cart: get().cart.map(item =>
            item.id === id ? {...item, quantity: item.quantity + 1} : item,
          ),
        }),

      decreaseByQuantity: (id: number) => {
        const cart = get().cart;
        const exists = cart.find(item => item.id === id);
        if (exists) {
          if (exists.quantity > 1) {
            set({
              cart: cart.map(item =>
                item.id === id ? {...item, quantity: item.quantity - 1} : item,
              ),
            });
          }else{
            set({
              cart:cart.filter(item=>item.id!==id)
            })
          }
        }
      },

      clearCart: () => set({cart: []}),
    }),
    {
      name: 'cart-storage',
      storage: zustandStorage,
    },
  ),
);

export default useCartStore;
