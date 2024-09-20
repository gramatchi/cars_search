import { useState, useEffect } from 'react';
import axios from 'axios';

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
  mileageTo
}) => {
  const [carMakes, setCarMakes] = useState([]);

  // Загрузка марок машин из API
  useEffect(() => {
    axios
      .get('../../../makes.json') // Укажите реальный путь к вашему JSON файлу
      .then((response) => {
        setCarMakes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching the car makes:', error);
      });
  }, []);

  // Генерируем шаги цены от 10 до максимальной цены с шагом 10
  const priceOptions = Array.from({ length: Math.ceil(maxPrice / 10) }, (_, i) => (i + 1) * 10);

  // Обработка изменения селекта для марки
  const handleSelectMakeChange = (event) => {
    const make = event.target.value;
    onSelectCarMake(make); // Передаем выбранную марку в родительский компонент
  };

  // Обработка изменения селекта для цены
  const handleSelectPriceChange = (event) => {
    const price = event.target.value;
    onSelectPrice(price); // Передаем выбранную цену в родительский компонент
  };

  // Обработка изменения полей для пробега (mileage)
  const handleMileageFromChange = (event) => {
    const from = event.target.value;
    onSelectMileageRange(from, mileageTo); // Передаем выбранный диапазон (от) в родительский компонент
  };

  const handleMileageToChange = (event) => {
    const to = event.target.value;
    onSelectMileageRange(mileageFrom, to); // Передаем выбранный диапазон (до) в родительский компонент
  };

  return (
    <div>
      {/* Фильтр по марке машины */}
      <label htmlFor="car-make-select">Car brand</label>
      <select id="car-make-select" value={selectedMake} onChange={handleSelectMakeChange}>
        <option value="" disabled>
          Enter the text
        </option>
        {carMakes.map((make, index) => (
          <option key={index} value={make}>
            {make}
          </option>
        ))}
      </select>

      {/* Фильтр по цене */}
      <label htmlFor="price-select">Price / 1 hour</label>
      <select id="price-select" value={selectedPrice} onChange={handleSelectPriceChange}>
        <option value="" disabled>
          To $
        </option>
        {priceOptions.map((price, index) => (
          <option key={index} value={price}>
            {price} {/* Убрали знак доллара */}
          </option>
        ))}
      </select>

      {/* Поля для диапазона пробега */}
      <label htmlFor="mileage-from">Mileage from</label>
      <input
        id="mileage-from"
        type="number"
        value={mileageFrom}
        onChange={handleMileageFromChange}
        placeholder="From"
      />

      <label htmlFor="mileage-to">Mileage to</label>
      <input
        id="mileage-to"
        type="number"
        value={mileageTo}
        onChange={handleMileageToChange}
        placeholder="To"
      />

      {/* Кнопка для поиска */}
      <button onClick={onSearch}>Search</button>

      {/* Кнопка для сброса */}
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

export default SearchBar;
