import React, { useState } from 'react';
import { CarType } from './cars-data';
import EditCar from './edit-car';

  
  type CarCardProps = {
    carBrands:CarType[];
    onDelete:(id:string)=>void;
}
const CarCard = ({carBrands,onDelete}:CarCardProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);

  const handleOpenEditModal = (car: CarType) => {
    setSelectedCar(car);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSaveChanges = (editedCar: CarType) => {
    fetch(`http://localhost:5000/cars/${editedCar.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editedCar),
  })
    .then((res) => {
      if (res.ok) {
        console.log('Car data updated successfully!');
      } else {
        console.error('Failed to update car data:', res);
      }
      handleCloseEditModal();
    })
    .catch((err) => {
      console.error('Error updating car data:', err);
      handleCloseEditModal();
    });
  };
  return (
    <div className="card__wrapper">
      {carBrands.map((car) => (
        <div className="card" key={car.id}>
          <img src={`https://source.unsplash.com/random/?${car.name}&logo`} alt="Car Logo" />
          <div className="card__info">
            <h2>{car.name}</h2>
            
              {car.models.map((model) => (
                <span key={model.id}><b>{model.name}</b></span>
              ))}
              ect...
            <div>
            <button onClick={() => handleOpenEditModal(car)}>Edit</button>
            <button onClick={() => onDelete(car.id)}>🗑️</button>
            </div>
          </div>
        </div>
      ))}
      {showEditModal && selectedCar && (
        <div>
          <div className="modal__overlay" onClick={handleCloseEditModal} />
          <EditCar
            car={selectedCar}
            onSave={handleSaveChanges}
            onClose={handleCloseEditModal}
          />
        </div>
      )}
    </div>
  )
}

export default CarCard