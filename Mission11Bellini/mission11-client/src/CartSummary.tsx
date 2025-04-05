import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const CartSummary = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const continueShopping = () => {
    sessionStorage.setItem("resumeShopping", "true");
    navigate("/");
  };

  return (
    <div className="card p-3">
      <h5>Cart Summary</h5>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.bookId}>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <hr />
      <div className="d-flex justify-content-between">
        <strong>Total:</strong>
        <strong>${total.toFixed(2)}</strong>
      </div>

      <div className="mt-3 text-end">
        <button className="btn btn-outline-secondary" onClick={continueShopping}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
