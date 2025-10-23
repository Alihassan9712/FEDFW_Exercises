import React, { useEffect, useState } from "react";

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const addBook = () => {
    fetch("http://localhost:5000/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "New Book", author: "New Author" })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Added:", data);
        setBooks((prev) => [...prev, data]);
      });
  };

  const updateBook = (id) => {
    fetch(`http://localhost:5000/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Updated Book", author: "Updated Author" })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Updated:", data);
        setBooks((prev) =>
          prev.map((book) => (book.id === id ? data : book))
        );
      });
  };

  const deleteBook = (id) => {
    fetch(`http://localhost:5000/books/${id}`, { method: "DELETE" })
      .then(() => {
        console.log("Deleted book with ID:", id);
        setBooks((prev) => prev.filter((book) => book.id !== id));
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Book List</h1>
      <button onClick={addBook}>Add Book</button>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}{" "}
            <button onClick={() => updateBook(book.id)}>Update</button>{" "}
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
