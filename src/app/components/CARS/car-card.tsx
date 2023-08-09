  import React, { useState } from 'react';
  import { CarType } from './cars-data';
  import EditCar from './edit-car';
  import carStore from './car-store';
  import HttpClient from './HttpClient';

    
    type CarCardProps = {
      carBrands:CarType[];
      onDelete:(id:string)=>void;
    }
    const httpClient = new HttpClient('http://localhost:5000/cars');
    
  const CarCard = ({carBrands,onDelete}:CarCardProps) => {
    const { 
      selectedCar,
      showEditModal,
      setShowEditModal,
      setSelectedCar
    } = carStore;

    const handleOpenEditModal = (car: CarType) => {
      setSelectedCar(car);
      setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
      setShowEditModal(false);
    };
  //Fetch metoda za spremanje promjenjenih podataka
    const handleSaveChanges = async (editedCar: CarType) => {
      try {
        await httpClient.put(`/${editedCar.id}`, editedCar);
        handleCloseEditModal();
      } catch (error) {
        console.error('Error updating car data:', error);
        handleCloseEditModal();
      }
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