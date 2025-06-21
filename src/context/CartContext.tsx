import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (raffleId: string) => void;
  updateQuantity: (raffleId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.raffleId === item.raffleId);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.raffleId === item.raffleId
            ? { ...cartItem, quantity: Math.min(cartItem.quantity + item.quantity, 20000) }
            : cartItem
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (raffleId: string) => {
    setCartItems(prev => prev.filter(item => item.raffleId !== raffleId));
  };

  const updateQuantity = (raffleId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(raffleId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.raffleId === raffleId
          ? { ...item, quantity: Math.min(quantity, 20000) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};