import styles from './CarModal.module.css';
import closeIcon from '../../images/close.svg'; 

const CarModal = ({ car, onClose, extractedWords }) => {
  const accessoriesString = car.accessories.join(' | ');
  const functionalitiesString = car.functionalities.join(' | ');
  const rentalConditionsArray = car.rentalConditions.split('\n');
  const formattedMileage = car.mileage.toLocaleString('en-US');

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <img src={closeIcon} alt="Close" className={styles.closeIcon} />
        </button>
        <img src={car.img} alt={car.description} className={styles.modalImage} />
        <p className={styles.title}>{car.make} <span className={styles.model}>{car.model}</span>, {car.year}</p>
        <p className={styles.additional} >{extractedWords} | Id: {car.id} | Year: {car.year} | Type: {car.type}</p>
        <p className={styles.additional}>Fuel Consumption: {car.fuelConsumption} | Engine Size: {car.engineSize}</p>
        <p className={styles.description} >{car.description}</p>
        <p className={styles.minititle} >Accessories and functionalities:</p>
        <p className={styles.additional}>{accessoriesString}</p>
        <p className={styles.additional}>{functionalitiesString}</p>
        <p className={styles.minititle} >Rental conditions:</p>
        <ul className={styles.rentalConditionsList}>
          {rentalConditionsArray.map((condition, index) => (
            <li key={index} className={styles.rentalConditionItem}>{condition}</li>
          ))}
          <li className={styles.rentalConditionItem}>Mileage: {formattedMileage}</li>
          <li className={styles.rentalConditionItem}>Price: {car.rentalPrice}</li>
        </ul>
        <a href={`tel:+380730000000`} className={styles.rentalCarButton}>
          Rental Car
        </a>
      </div>
    </div>
  );
};

export default CarModal;
