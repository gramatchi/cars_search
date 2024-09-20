import { useState, useEffect } from "react";
import axios from "axios";
import CarItem from "../../components/CarItem/CarItem";
import styles from "./Favorites.module.css";

const Favorites = () => {
  const [cars, setCars] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get("https://66ec85b02b6cf2b89c5eb0b3.mockapi.io/cars")
      .then((response) => {
        setCars(response.data);
      })
  }, []);

  useEffect(() => {
    const favoriteIds = Object.keys(localStorage)
      .filter(
        (key) =>
          key.startsWith("favorite-") && localStorage.getItem(key) === "true"
      )
      .map((key) => parseInt(key.replace("favorite-", ""), 10));

    const favoriteCars = cars.filter((car) => favoriteIds.includes(car.id));
    setFavorites(favoriteCars);
  }, [cars]);

  return (
    <div>
      <h1>Favorites</h1>
      <div className={styles.carContainer}>
        {favorites.length > 0 ? (
          favorites.map((car) => <CarItem key={car.id} car={car} />)
        ) : (
          <p>No favorites found</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
