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

const defaultBook: Book = {
  bookId: 0,
  title: '',
  author: '',
  publisher: '',
  isbn: '',
  classification: '',
  category: '',
  pageCount: 0,
  price: 0
};

const API = 'https://localhost:7220/api/books'; // ✅ Use full API path

const AdminBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book>(defaultBook);

  const loadBooks = () => {
    axios.get(API).then(res => setBooks(res.data));
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingBook(prev => ({
      ...prev,
      [name]: name === "pageCount" || name === "price" ? +value : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBook.bookId === 0) {
      axios.post(API, editingBook).then(() => {
        loadBooks();
        setEditingBook(defaultBook);
      });
    } else {
      axios.put(`${API}/${editingBook.bookId}`, editingBook).then(() => {
        loadBooks();
        setEditingBook(defaultBook);
      });
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      axios.delete(`${API}/${id}`).then(() => loadBooks());
    }
  };

  return (
    <div className="container mt-4">
      <h2>Admin: Manage Books</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <h5>{editingBook.bookId === 0 ? "Add New Book" : "Edit Book"}</h5>
        <div className="row g-2">
          <div className="col-md-6">
            <input className="form-control" name="title" placeholder="Title" value={editingBook.title} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <input className="form-control" name="author" placeholder="Author" value={editingBook.author} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input className="form-control" name="publisher" placeholder="Publisher" value={editingBook.publisher} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input className="form-control" name="isbn" placeholder="ISBN" value={editingBook.isbn} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input className="form-control" name="classification" placeholder="Classification" value={editingBook.classification} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input className="form-control" name="category" placeholder="Category" value={editingBook.category} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input type="number" className="form-control" name="pageCount" placeholder="Pages" value={editingBook.pageCount} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input type="number" step="0.01" className="form-control" name="price" placeholder="Price" value={editingBook.price} onChange={handleChange} required />
          </div>
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-success">
              {editingBook.bookId === 0 ? "Add Book" : "Update Book"}
            </button>
          </div>
        </div>
      </form>

      <h5>Book List</h5>
      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            <th>Title</th><th>Author</th><th>Category</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(b => (
            <tr key={b.bookId}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.category}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(b)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(b.bookId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBooks;
