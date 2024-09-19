import { Route, Routes } from "react-router-dom";
import "./App.css";
import Catalog from "./pages/CatalogPage/Catalog";
import Favotities from "./pages/FavoritesPage/Favotities";
import Home from "./pages/HomePage/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favotities />} />
        <Route path="/Catalog" element={<Catalog />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
