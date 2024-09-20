import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./SearchBar.module.css"; // Импорт CSS модуля

const SearchBar = ({
  onSelectCarMake,
  onSelectPrice,
  onSearch,
  onReset,
  selectedMake,
  selectedPrice,
  maxPrice,
  onSelectMileageRange,
  mileageFrom,
  mileageTo,
}) => {
  const [carMakes, setCarMakes] = useState([]);

  useEffect(() => {
    axios
      .get("../../../makes.json")
      .then((response) => {
        setCarMakes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the car makes:", error);
      });
  }, []);

  const priceOptions = Array.from(
    { length: Math.ceil(maxPrice / 10) },
    (_, i) => (i + 1) * 10
  );

  const handleSelectMakeChange = (event) => {
    const make = event.target.value;
    onSelectCarMake(make);
  };

  const handleSelectPriceChange = (event) => {
    const price = event.target.value;
    onSelectPrice(price);
  };

  const handleMileageFromChange = (event) => {
    const from = event.target.value;
    onSelectMileageRange(from, mileageTo);
  };

  const handleMileageToChange = (event) => {
    const to = event.target.value;
    onSelectMileageRange(mileageFrom, to);
  };

  return (
    <div className={styles.searchBarWrapper}>
      <div className={styles.searchBarContainer}>
        <div className={styles.searchField}>
          <label htmlFor="car-make-select">Car brand</label>
          <select
            id="car-make-select"
            value={selectedMake}
            onChange={handleSelectMakeChange}
          >
            <option value="" disabled>
              Enter the text
            </option>
            {carMakes.map((make, index) => (
              <option key={index} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.searchField}>
          <label htmlFor="price-select">Price / 1 hour</label>
          <select
            id="price-select"
            value={selectedPrice}
            onChange={handleSelectPriceChange}
          >
            <option value="" disabled>
              To $
            </option>
            {priceOptions.map((price, index) => (
              <option key={index} value={price}>
                {price}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.searchField}>
          <label htmlFor="mileage-range">Car mileage / km</label>
          <div className={styles.mileageInputs}>
            <input
              id="mileage-from"
              type="number"
              value={mileageFrom}
              onChange={handleMileageFromChange}
              placeholder="From"
            />
            <span className={styles.mileageSeparator}>-</span>
            <input
              id="mileage-to"
              type="number"
              value={mileageTo}
              onChange={handleMileageToChange}
              placeholder="To"
            />
          </div>
        </div>

        <button className={styles.searchButton} onClick={onSearch}>
          Search
        </button>
        <button className={styles.resetButton} onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
