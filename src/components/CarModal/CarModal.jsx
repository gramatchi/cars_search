import styles from './CarModal.module.css'; 

const CarModal = ({ car, onClose, extractedWords }) => {
  const accessoriesString = car.accessories.join(' | ');
  const functionalitiesString = car.functionalities.join(' | ');
  const rentalConditionsArray = car.rentalConditions.split('\n');
  const formattedMileage = car.mileage.toLocaleString('en-US');
  

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <img src={car.img} alt={car.description} className={styles.modalImage} />
        <p>{car.make} <span className={styles.model}>{car.model}</span>, {car.year}</p>
        <p>{extractedWords} | Id: {car.id} | Year: {car.year} | Type: {car.type}</p>
        <p>Fuel Consumption: {car.fuelConsumption} | Engine Size: {car.engineSize}</p>
        <p>{car.description}</p>
        <p>Accessories and functionalities:</p>
        <p>{accessoriesString}</p>
        <p>{functionalitiesString}</p>
        <p>Rental conditions:</p>
        <ul>
          {rentalConditionsArray.map((condition, index) => (
            <li key={index}>{condition}</li>
          ))}
          <li>Mileage: {formattedMileage}</li>
          <li>Price: {car.rentalPrice}</li>
        </ul>
        <a href={`tel:+380730000000`} className={styles.rentalCarButton}>
          Rental Car
        </a>
      </div>
    </div>
  );
};

export default CarModal;
