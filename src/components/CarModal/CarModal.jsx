import styles from "./CarModal.module.css";
import closeIcon from "../../images/close.svg";

const CarModal = ({ car, onClose, extractedWords }) => {
  const accessoriesString = car.accessories.join(" | ");
  const functionalitiesString = car.functionalities.join(" | ");
  const rentalConditionsArray = car.rentalConditions.split("\n");
  const formattedMileage = car.mileage.toLocaleString("en-US");

  // Функция для выделения числа в строке
  const highlightAge = (condition) => {
    const numberPattern = /(\d+)/; // Регулярное выражение для поиска любого числа
    const match = condition.match(numberPattern);
  
    if (match) {
      const [fullMatch, number] = match;
      const parts = condition.split(number); // Разделяем строку на части
      return (
        <>
          {parts[0].trim()}{" "} {/* Убираем лишние пробелы и добавляем пробел перед числом */}
          <span className={styles.conditionWithDigit}>{number}</span>
          {parts[1] && ` ${parts[1]}`} {/* Добавляем пробел перед остатком строки, если он есть */}
        </>
      );
    }
    return condition;
  };
  
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <img src={closeIcon} alt="Close" className={styles.closeIcon} />
        </button>
        <img src={car.img} alt={car.description} className={styles.modalImage} />
        <p className={styles.title}>
          {car.make} <span className={styles.model}>{car.model}</span>, {car.year}
        </p>
        <p className={styles.additional}>
          {extractedWords} | Id: {car.id} | Year: {car.year} | Type: {car.type}
        </p>
        <p className={styles.additional}>
          Fuel Consumption: {car.fuelConsumption} | Engine Size: {car.engineSize}
        </p>
        <p className={styles.description}>{car.description}</p>
        <p className={styles.minititle}>Accessories and functionalities:</p>
        <p className={styles.additional}>{accessoriesString}</p>
        <p className={styles.additional}>{functionalitiesString}</p>
        <p className={styles.minititle}>Rental conditions:</p>
        <ul className={styles.rentalConditionsList}>
          {rentalConditionsArray.map((condition, index) => (
            <li key={index} className={styles.rentalConditionItem}>
              {highlightAge(condition)}
            </li>
          ))}
          <li className={styles.rentalConditionItem}>
            Mileage:{" "}
            <span className={styles.conditionWithDigit}>
              {" "}{formattedMileage}
            </span>
          </li>
          <li className={styles.rentalConditionItem}>
            Price:{" "}
            <span className={styles.conditionWithDigit}>
              {"  " + car.rentalPrice}
            </span>
          </li>
        </ul>
        <a href={`tel:+380730000000`} className={styles.rentalCarButton}>
          Rental Car
        </a>
      </div>
    </div>
  );
}  

export default CarModal;
