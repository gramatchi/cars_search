const CarItem = ({car}) => {
  return (
    <div className="car-card">
      <img src={car.img} alt={`${car.description}`} className="car-image" />
      <div className="car-info">
        <h3>{car.make} {car.model}</h3>
        <p><strong>Year:</strong> {car.year}</p>
        <p><strong>Rental Price:</strong> ${car.rentalPrice}</p>
        <p><strong>Address:</strong> {car.address}</p>
        <p><strong>Rental Company:</strong> {car.rentalCompany}</p>
        <p><strong>Type:</strong> {car.type}</p>
        <p><strong>Mileage:</strong> {car.mileage} km</p>
        <p><strong>Functionalities:</strong> {car.functionalities[0]}</p>
      </div>
    </div>
  )
}

export default CarItem