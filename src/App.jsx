import { Route, Router, Routes } from "react-router-dom";
import CategoryPage from "./components/Category";
import BookListPage from "./components/BookListPage";
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CategoryPage />} />
      <Route path="/books/:genre" element={<BookListPage />} />
    </Routes>
  );
}

export default App;
