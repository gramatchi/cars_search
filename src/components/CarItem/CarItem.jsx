import { useState, useEffect } from "react";
import styles from "./CarItem.module.css";
import heart from "../../images/heart.svg";
import CarModal from "../CarModal/CarModal";

const CarItem = ({ car }) => {
  const storageKey = `favorite-${car.id}`;

  const [isFavorite, setIsFavorite] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved === "true";
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getFirstThreeWords = (text) => {
    const words = text.split(" ");
    return words.slice(0, 2).join(" "); // Получаем первые три слова и объединяем их обратно в строку
  };

  useEffect(() => {
    localStorage.setItem(storageKey, isFavorite);
  }, [isFavorite]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const handleHeartClick = () => {
    setIsFavorite((prevState) => !prevState);
  };

  const handleLearnMoreClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const extractWords = (address) => {
    const parts = address.split(",");
    const city = parts[1].split(" ").pop().trim();
    const country = parts[2].trim();
    return `${city} | ${country}`;
  };

  const extractedWords = extractWords(car.address);

  return (
    <div className={styles.carCard}>
      <div className={styles.imageContainer}>
        <img
          src={car.img}
          alt={`${car.description}`}
          className={styles.carImage}
        />
        <svg
          className={`${styles.heart} ${isFavorite ? styles.heartActive : ""}`}
          width="18"
          height="18"
          onClick={handleHeartClick}
        >
          <use href={`${heart}#heart`} />
        </svg>
      </div>
      <div className={styles.carInfo}>
        <div className={styles.carInfoFirst}>
          <p>
            {car.make} <span className={styles.model}>{car.model}</span>,{" "}
            {car.year}
          </p>
          <p className={styles.price}>{car.rentalPrice}</p>
        </div>
        <div className={styles.carInfoSecond}>
          <p>
            {extractedWords} | {car.rentalCompany}
          </p>
          <p>
            {car.type} | {car.model} | {car.mileage} |{" "}
            {getFirstThreeWords(car.functionalities[0])}
          </p>
        </div>
        <button className={styles.learnMoreBtn} onClick={handleLearnMoreClick}>
          Learn more
        </button>
      </div>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <CarModal
              car={car}
              extractedWords={extractedWords}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CarItem;
