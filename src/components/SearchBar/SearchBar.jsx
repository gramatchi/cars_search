import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "./SearchBar.module.css";

const SearchBar = ({
  onSelectCarMake,
  onSelectPrice,
  onSearch,
  onReset,
  maxPrice,
  onSelectMileageRange,
}) => {
  const [carMakes, setCarMakes] = useState([]);

  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [mileageFrom, setMileageFrom] = useState("");
  const [mileageTo, setMileageTo] = useState("");

  useEffect(() => {
    const fetchCarMakes = async () => {
      try {
        const response = await axios.get("../../../makes.json");

        if (Array.isArray(response.data)) {
          setCarMakes(response.data);
        } else {
          // console.error(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCarMakes();
  }, []);

  const priceOptions = Array.from(
    { length: Math.ceil(maxPrice / 10) },
    (_, i) => ({ value: (i + 1) * 10, label: `${(i + 1) * 10}` })
  );

  const handleSelectMakeChange = (selectedOption) => {
    const make = selectedOption ? selectedOption.value : "";
    setSelectedMake(make);
    onSelectCarMake(make);
  };

  const handleSelectPriceChange = (selectedOption) => {
    const price = selectedOption ? selectedOption.value : null;
    setSelectedPrice(price);
    onSelectPrice(price);
  };

  const handleMileageFromChange = (event) => {
    const from = event.target.value;
    setMileageFrom(from);
    onSelectMileageRange(from, mileageTo);
  };

  const handleMileageToChange = (event) => {
    const to = event.target.value;
    setMileageTo(to);
    onSelectMileageRange(mileageFrom, to);
  };

  const handleReset = () => {
    setSelectedMake(null);
    setSelectedPrice(null);
    setMileageFrom("");
    setMileageTo("");
    onSelectCarMake("");
    onSelectPrice(null);
    onSelectMileageRange("", "");
    if (onReset) {
      onReset();
    }
  };

  const isSearchDisabled =
    !selectedMake && !selectedPrice && !mileageFrom && !mileageTo;

  const carMakeOptions = carMakes.map((make) => ({
    value: make,
    label: make,
  }));

  return (
    <div className={styles.searchBarWrapper}>
      <div className={styles.searchBarContainer}>
        <div className={styles.searchField}>
          <label className={styles.searchLabel} htmlFor="car-make-select">
            Car brand
          </label>
          <Select
            id="car-make-select"
            value={
              carMakeOptions.find((option) => option.value === selectedMake) ||
              null
            }
            onChange={handleSelectMakeChange}
            options={carMakeOptions}
            placeholder="Enter the text"
            className={styles.selectFieldMake}
            styles={{
              control: (provided) => ({
                ...provided,
                borderRadius: "14px",
                width: "224px",
                height: "48px",
                border: "1px solid #ccc",
                boxShadow: "none",
                alignItems: "center",
                display: "flex",
                font: '500 18px / 1.11111 "Manrope", sans-serif',
                color: "#121417",
                background: "#f7f7fb",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "#121417",
                width: "100%",
              }),
              placeholder: (provided) => ({
                ...provided,
                color: "#121417",
                display: "flex",
                background: "#f7f7fb",
              }),
              indicatorSeparator: () => ({
                display: "none",
              }),
              menu: (provided) => ({
                ...provided,
                borderRadius: "14px",
                border: "1px solid rgba(18, 20, 23, 0.05)",
                background: "#fff",
                boxShadow: "0 4px 36px 0 rgba(0, 0, 0, 0.02)",
                color: "rgba(18, 20, 23, 0.2)",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? "#e0e0e0" : "#fff",
                borderRadius: "14px",
                color: state.isFocused ? "black" : "rgba(18, 20, 23, 0.2)",
              }),
            }}
            isSearchable={false}
          />
        </div>

        <div className={styles.searchField}>
          <label className={styles.searchLabel} htmlFor="price-select">
            Price / 1 hour
          </label>
          <Select
            id="price-select"
            value={
              priceOptions.find((option) => option.value === selectedPrice) ||
              null
            }
            onChange={handleSelectPriceChange}
            options={priceOptions}
            placeholder="To $"
            className={styles.selectFieldPrice}
            styles={{
              control: (provided) => ({
                ...provided,
                borderRadius: "14px",
                width: "125px",
                height: "48px",
                border: "1px solid #ccc",
                boxShadow: "none",
                alignItems: "center",
                display: "flex",
                font: '500 18px / 1.11111 "Manrope", sans-serif',
                color: "#121417",
                background: "#f7f7fb",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "#121417",
                width: "100%",
              }),
              placeholder: (provided) => ({
                ...provided,
                color: "#121417",
                display: "flex",
                background: "#f7f7fb",
              }),
              indicatorSeparator: () => ({
                display: "none",
              }),
              menu: (provided) => ({
                ...provided,
                borderRadius: "14px",
                border: "1px solid rgba(18, 20, 23, 0.05)",
                background: "#fff",
                boxShadow: "0 4px 36px 0 rgba(0, 0, 0, 0.02)",
                color: "rgba(18, 20, 23, 0.2)",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? "#e0e0e0" : "#fff",
                borderRadius: "14px",
                color: state.isFocused ? "black" : "rgba(18, 20, 23, 0.2)",
              }),
            }}
            isSearchable={false}
          />
        </div>

        <div className={styles.searchField}>
          <label className={styles.searchLabel} htmlFor="mileage-range">
            Car mileage / km
          </label>
          <div className={styles.mileageInputs}>
            <input
              id="mileage-from"
              value={mileageFrom}
              onChange={handleMileageFromChange}
              placeholder="From"
              className={styles.inputMileageLeft}
            />
            <span className={styles.mileageSeparator}></span>
            <input
              id="mileage-to"
              value={mileageTo}
              onChange={handleMileageToChange}
              placeholder="To"
              className={styles.inputMileageRight}
            />
          </div>
        </div>

        <button
          className={styles.searchButton}
          onClick={onSearch}
          disabled={isSearchDisabled}
        >
          Search
        </button>
        <button className={styles.resetButton} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
