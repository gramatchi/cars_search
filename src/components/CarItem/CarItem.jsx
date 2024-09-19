import styles from "./CarItem.module.css";
import heart from "../../images/heart.svg";

const CarItem = ({ car }) => {
  const extractWords = (address) => {
    const parts = address.split(',');
    const city = parts[1].split(' ').pop().trim(); 
    const country = parts[2].trim(); 
    return `${city} | ${country}`; 
  };

  const extractedWords = extractWords(car.address);

  return (
    <div className={styles.carContainer}>
      <div className={styles.carCard}>
        <div className={styles.imageContainer}>
          <img
            src={car.img}
            alt={`${car.description}`}
            className={styles.carImage}
          />
          <svg className={styles.heart} width="18" height="18">
            <use href={`${heart}#heart`} />
          </svg>
        </div>
        <div className={styles.carInfo}>
          <div className={styles.carInfoFirst}>
            <p>{car.make} <span className={styles.model}>{car.model}</span>, {car.year}</p>
            <p className={styles.price}>{car.rentalPrice}</p>
          </div>
          <div className={styles.carInfoSecond}>
            <p>{extractedWords} | {car.rentalCompany}</p>
            <p>{car.type} | {car.model} | {car.mileage} | {car.functionalities[0]}</p>
          </div>
          <button className={styles.learnMoreBtn}>Learn more</button>
        </div>
      </div>
    </div>
  );
};

export default CarItem;
