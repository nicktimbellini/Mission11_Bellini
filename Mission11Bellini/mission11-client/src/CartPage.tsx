// src/CartPage.tsx
import React from 'react';
import CartSummary from './CartSummary';

const CartPage = () => {
  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      <CartSummary />
    </div>
  );
};

export default CartPage;
