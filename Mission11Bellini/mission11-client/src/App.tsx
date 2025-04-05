import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import BookList from './BookList';
import CartPage from './CartPage';
import CartSummary from './CartSummary';

function App() {
  return (
    <div className="container mt-4">
      {/* Navbar with links */}
      <nav className="mb-4">
        <Link to="/" className="btn btn-outline-primary me-2">Home</Link>
        <Link to="/cart" className="btn btn-outline-success">View Cart</Link>
      </nav>

      {/* Routes for page navigation */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="row">
              <div className="col-md-8">
                <BookList />
              </div>
              <div className="col-md-4">
                <div className="accordion" id="cartAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                        Cart Summary
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show">
                      <div className="accordion-body">
                        <CartSummary />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
