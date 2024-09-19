import React, { useState, useEffect } from "react";
import styles from "./CarItem.module.css";
import heart from "../../images/heart.svg";

const CarItem = ({ car }) => {
  const storageKey = `favorite-${car.id}`;
  const [isFavorite, setIsFavorite] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem(storageKey, isFavorite);
  }, [isFavorite]);

  const handleHeartClick = () => {
    setIsFavorite(prevState => !prevState);
  };

  return (
    <div className={styles.carContainer}>
      <div className={styles.carCard}>
        <div className={styles.imageContainer}>
          <img
            src={car.img}
            alt={`${car.description}`}
            className={styles.carImage}
          />
          <svg 
            className={`${styles.heart} ${isFavorite ? styles.heartActive : ''}`}
            width="18" 
            height="18"
            onClick={handleHeartClick}
          >
            <use href={`${heart}#heart`} />
          </svg>
        </div>
        <div className={styles.carInfo}>
          <div className={styles.carInfoFirst}>
            <p>{car.make} <span className={styles.model}>{car.model}</span>, {car.year}</p>
            <p className={styles.price}>{car.rentalPrice}</p>
          </div>
          <div className={styles.carInfoSecond}>
            <p>{car.address} | {car.rentalCompany}</p>
            <p>{car.type} | {car.model} | {car.mileage} | {car.functionalities[0]}</p>
          </div>
          <button className={styles.learnMoreBtn}>Learn more</button>
        </div>
      </div>
    </div>
  );
};

export default CarItem;
