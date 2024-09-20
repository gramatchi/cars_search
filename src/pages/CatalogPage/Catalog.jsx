import { useEffect, useState } from "react";
import axios from "axios";
import CarItem from "../../components/CarItem/CarItem";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./Catalog.module.css";

const Catalog = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [mileageFrom, setMileageFrom] = useState("");
  const [mileageTo, setMileageTo] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);

  const [page, setPage] = useState(1); 
  const [isLoading, setIsLoading] = useState(false); 
  const [hasMore, setHasMore] = useState(true);
  const [isSearching, setIsSearching] = useState(false); // Новое состояние

  const fetchCars = (page = 1, isLoadMore = false) => {
    setIsLoading(true);
    axios
      .get(`https://66ec85b02b6cf2b89c5eb0b3.mockapi.io/cars?page=${page}&limit=12`)
      .then((response) => {
        if (response.data.length > 0) {
          if (!isLoadMore) {
            setCars(response.data);
            setFilteredCars(response.data);
          } else {
            setCars((prevCars) => [...prevCars, ...response.data]);
            setFilteredCars((prevCars) => [...prevCars, ...response.data]);
          }

          const prices = response.data.map((car) =>
            parseFloat(car.rentalPrice.replace("$", ""))
          );
          setMaxPrice((prevMax) => Math.max(prevMax, ...prices));
        } else {
          setHasMore(false); 
        }
      })
      .catch((error) => {
        console.error("Error fetching the cars:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCars(page); 
  }, []);

  const handleSearch = () => {
    let filtered = cars;

    if (selectedMake) {
      filtered = filtered.filter((car) => car.make === selectedMake);
    }

    if (selectedPrice) {
      filtered = filtered.filter((car) => {
        const price = parseFloat(car.rentalPrice.replace("$", ""));
        return price < selectedPrice;
      });
    }

    if (mileageFrom) {
      filtered = filtered.filter((car) => car.mileage >= mileageFrom);
    }

    if (mileageTo) {
      filtered = filtered.filter((car) => car.mileage <= mileageTo);
    }

    setFilteredCars(filtered);
    setIsSearching(true); // Устанавливаем состояние поиска
  };

  const handleReset = () => {
    setSelectedMake("");
    setSelectedPrice("");
    setMileageFrom("");
    setMileageTo("");
    setFilteredCars(cars);
    setIsSearching(false); // Сбрасываем состояние поиска
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage); 
    fetchCars(nextPage, true); 
  };

  return (
    <div>
      <SearchBar
        onSelectCarMake={setSelectedMake}
        onSelectPrice={setSelectedPrice}
        onSearch={handleSearch}
        onReset={handleReset}
        selectedMake={selectedMake}
        selectedPrice={selectedPrice}
        maxPrice={maxPrice}
        onSelectMileageRange={(from, to) => {
          setMileageFrom(from);
          setMileageTo(to);
        }}
        mileageFrom={mileageFrom}
        mileageTo={mileageTo}
      />

      <div className={styles.carContainer}>
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => <CarItem key={car.id} car={car} />)
        ) : (
          <p>No cars found.</p>
        )}
      </div>

      {hasMore && !isSearching && (
        <button className={styles.loadMoreButton} onClick={handleLoadMore} disabled={isLoading}>
          {isLoading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
};

export default Catalog;
