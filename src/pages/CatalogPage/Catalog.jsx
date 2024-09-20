import { useEffect, useState } from 'react';
import axios from 'axios';
import CarItem from '../../components/CarItem/CarItem';
import SearchBar from '../../components/SearchBar/SearchBar'; // Импортируем SearchBar
import styles from './Catalog.module.css';

const Catalog = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]); // Отфильтрованные машины
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [mileageFrom, setMileageFrom] = useState('');
  const [mileageTo, setMileageTo] = useState('');
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    axios
      .get('https://66ec85b02b6cf2b89c5eb0b3.mockapi.io/cars')
      .then((response) => {
        setCars(response.data);
        setFilteredCars(response.data); // Устанавливаем изначально все машины
        // Устанавливаем максимальную цену
        const prices = response.data.map(car => parseFloat(car.rentalPrice.replace('$', '')));
        setMaxPrice(Math.max(...prices));
      })
      .catch((error) => {
        console.error('Error fetching the cars:', error);
      });
  }, []);

  // Функция для поиска машин
  const handleSearch = () => {
    let filtered = cars;

    if (selectedMake) {
      filtered = filtered.filter(car => car.make === selectedMake);
    }

    if (selectedPrice) {
      filtered = filtered.filter(car => {
        const price = parseFloat(car.rentalPrice.replace('$', ''));
        return price < selectedPrice;
      });
    }

    if (mileageFrom) {
      filtered = filtered.filter(car => car.mileage >= mileageFrom);
    }

    if (mileageTo) {
      filtered = filtered.filter(car => car.mileage <= mileageTo);
    }

    setFilteredCars(filtered);
  };

  // Функция для сброса фильтров
  const handleReset = () => {
    setSelectedMake('');
    setSelectedPrice('');
    setMileageFrom('');
    setMileageTo('');
    setFilteredCars(cars); // Сбрасываем фильтрацию
  };

  return (
    <div>
      {/* Рендерим SearchBar с пропсами */}
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

      {/* Список машин */}
      <div className={styles.carContainer}>
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => <CarItem key={car.id} car={car} />)
        ) : (
          <p>No cars found.</p>
        )}
      </div>
    </div>
  );
};

export default Catalog;
