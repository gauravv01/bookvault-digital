import { Route, Router, Routes } from "react-router-dom";
import {CategoryPage} from "./Components/CategoryPage.jsx";
import {BookListPage} from "./Components/BookListPage.jsx";
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
