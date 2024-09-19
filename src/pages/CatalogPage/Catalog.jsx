import { useEffect, useState } from 'react';
import axios from 'axios';
import CarItem from '../../components/CarItem/CarItem';

const Catalog = () => {
  const [cars, setCars] = useState([]); 

  useEffect(() => {
    axios
      .get('https://66ec85b02b6cf2b89c5eb0b3.mockapi.io/cars')
      .then((response) => {
        setCars(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching the cars:', error);
      });
  }, []);

  return (
    <div>
      {cars.length > 0 ? (
        cars.map((car) => <CarItem key={car.id} car={car} />)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Catalog;
