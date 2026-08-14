import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('saiyam_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    localStorage.setItem('saiyam_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (course) => {
    const exists = cart.some(item => item.id === course.id);
    if (!exists) {
      setCart(prev => [...prev, course]);
    }
  };

  const removeFromCart = (courseId) => {
    setCart(prev => prev.filter(item => item.id !== courseId));
    if (cart.length <= 1) {
      setCoupon(null);
    }
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const applyCoupon = (couponData) => {
    setCoupon(couponData);
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  const subtotal = cart.reduce((acc, course) => {
    const price = course.sale_price > 0 ? course.sale_price : course.price;
    return acc + (price || 0);
  }, 0);

  const discount = coupon ? coupon.discount_amount : 0;
  const total = Math.max(0, subtotal - discount);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      subtotal,
      discount,
      total,
      coupon,
      applyCoupon,
      removeCoupon,
      cartCount: cart.length
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
