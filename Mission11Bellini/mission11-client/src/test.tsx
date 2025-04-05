import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    axios.get(`https://localhost:7220/api/books?page=${page}&pageSize=${pageSize}&sort=${sort}`)
      .then(response => setBooks(response.data));
  }, [page, pageSize, sort]);

  return (
    <div className="container mt-4">
      <h2>Books</h2>
      <div className="mb-3">
        <label>Results per page: </label>
        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
          {[5, 10, 15].map(size => <option key={size} value={size}>{size}</option>)}
        </select>
      </div>
      <div className="mb-3">
        <label>Sort by: </label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th><th>Author</th><th>Publisher</th><th>ISBN</th><th>Category</th><th>Pages</th><th>Price</th>
          </tr>
        </thead>
        <tbody>
          {books.map(b => (
            <tr key={b.bookId}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.isbn}</td>
              <td>{b.category}</td>
              <td>{b.pageCount}</td>
              <td>${b.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setPage(p => Math.max(1, p - 1))}>Previous</button>
      <span className="mx-2">Page {page}</span>
      <button onClick={() => setPage(p => p + 1)}>Next</button>
    </div>
  );
};

export default BookList;
