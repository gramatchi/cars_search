import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Catalog from "./pages/CatalogPage/Catalog";
import Favorites from "./pages/FavoritesPage/Favorites";
import Home from "./pages/HomePage/Home";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/Catalog" element={<Catalog />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
