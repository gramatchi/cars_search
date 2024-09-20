import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "./SearchBar.module.css";

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
  const [selectedMakeOption, setSelectedMakeOption] = useState(null);
  const [selectedPriceOption, setSelectedPriceOption] = useState(null);

  useEffect(() => {
    axios
      .get("../../../makes.json")
      .then((response) => {
        const makeOptions = response.data.map((make) => ({
          value: make,
          label: make,
        }));
        setCarMakes(makeOptions);
      })
      .catch((error) => {
        console.error("Error fetching the car makes:", error);
      });
  }, []);

  const priceOptions = Array.from(
    { length: Math.ceil(maxPrice / 10) },
    (_, i) => ({ value: (i + 1) * 10, label: `$${(i + 1) * 10}` })
  );

  const handleSelectMakeChange = (selectedOption) => {
    setSelectedMakeOption(selectedOption);
    onSelectCarMake(selectedOption ? selectedOption.value : "");
  };

  const handleSelectPriceChange = (selectedOption) => {
    setSelectedPriceOption(selectedOption);
    onSelectPrice(selectedOption ? selectedOption.value : "");
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
          <label className={styles.searchLabel}>Car brand</label>
          <Select
            classNamePrefix="custom-select"
            options={carMakes}
            onChange={handleSelectMakeChange}
            value={selectedMakeOption}
            placeholder="Enter the text"
          />
        </div>

        <div className={styles.searchField}>
          <label className={styles.searchLabel}>Price / 1 hour</label>
          <Select
            classNamePrefix="custom-select"
            options={priceOptions}
            onChange={handleSelectPriceChange}
            value={selectedPriceOption}
            placeholder="To $"
          />
        </div>

        <div className={styles.searchField}>
          <label className={styles.searchLabel}>Car mileage / km</label>
          <div className={styles.mileageInputs}>
            <input
              type="number"
              value={mileageFrom}
              onChange={handleMileageFromChange}
              placeholder="From"
              className={styles.mileageInput}
            />
            <span className={styles.mileageSeparator}>-</span>
            <input
              type="number"
              value={mileageTo}
              onChange={handleMileageToChange}
              placeholder="To"
              className={styles.mileageInput}
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
