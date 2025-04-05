import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';

interface Book {
  bookId: number;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  classification: string;
  category: string;
  pageCount: number;
  price: number;
}

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sort, setSort] = useState("title");
  const [category, setCategory] = useState<string | null>(null);

  const { addToCart } = useCart();

  // Restore view from session if returning
  useEffect(() => {
    const shouldResume = sessionStorage.getItem("resumeShopping");
    if (shouldResume === "true") {
      const savedPage = sessionStorage.getItem("lastPage");
      const savedCategory = sessionStorage.getItem("lastCategory");
      const savedSort = sessionStorage.getItem("lastSort");

      if (savedPage) setPage(parseInt(savedPage));
      if (savedCategory) setCategory(savedCategory);
      if (savedSort) setSort(savedSort);

      sessionStorage.removeItem("resumeShopping");
    }
  }, []);

  // Load books from API
  useEffect(() => {
    axios
      .get(`https://localhost:7220/api/books?page=${page}&pageSize=${pageSize}&sort=${sort}${category ? `&category=${category}` : ""}`)
      .then(response => setBooks(response.data));
  }, [page, pageSize, sort, category]);

  return (
    <div className="container mt-4">
      <h2>Books</h2>

      {/* Category Filter */}
      <div className="mb-3">
        <label>Filter by Category: </label>
        <select value={category ?? ""} onChange={(e) => {
          setCategory(e.target.value || null);
          setPage(1);
        }}>
          <option value="">All</option>
          <option value="Biography">Biography</option>
          <option value="Self-Help">Self-Help</option>
          <option value="Fiction">Fiction</option>
          <option value="Business">Business</option>
        </select>
      </div>

      {/* Page Size Selector */}
      <div className="mb-3">
        <label>Results per page: </label>
        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
          {[5, 10, 15].map(size => <option key={size} value={size}>{size}</option>)}
        </select>
      </div>

      {/* Sort Selector */}
      <div className="mb-3">
        <label>Sort by: </label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>
      </div>

      {/* Book Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th><th>Author</th><th>Publisher</th><th>ISBN</th><th>Category</th><th>Pages</th><th>Price</th><th></th>
          </tr>
        </thead>
        <tbody>
          {books.map(b => (
            <tr key={b.bookId}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.isbn}</td>
              <td><span className="badge bg-secondary">{b.category}</span></td>
              <td>{b.pageCount}</td>
              <td>${b.price.toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    // Save view state for continue shopping
                    console.log("Adding to cart:", b.title);
                    sessionStorage.setItem("lastPage", page.toString());
                    sessionStorage.setItem("lastCategory", category ?? "");
                    sessionStorage.setItem("lastSort", sort);
                    sessionStorage.setItem("resumeShopping", "true");

                    addToCart({
                      bookId: b.bookId,
                      title: b.title,
                      price: b.price,
                      quantity: 1
                    });
                  }}
                >
                  Add to Cart

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-3">
        <button className="btn btn-outline-primary me-2" onClick={() => setPage(p => Math.max(1, p - 1))}>
          Previous
        </button>
        <span className="mx-2">Page {page}</span>
        <button className="btn btn-outline-primary" onClick={() => setPage(p => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;
