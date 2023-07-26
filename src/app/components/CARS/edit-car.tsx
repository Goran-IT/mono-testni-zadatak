import React, { useState } from 'react';
import { CarType } from './cars-data';

type EditCarModalProps = {
  car: CarType;
  onSave: (car: CarType) => void;
  onClose: () => void;
};

const EditCar= ({ car, onSave, onClose }:EditCarModalProps) => {
  const [editedCar, setEditedCar] = useState<CarType>({ ...car });

  const handleEditCarName = (event:any) => {
    setEditedCar({ ...editedCar, name: event.target.value });
  };

  const handleEditModelName = (modelId: string, newName: string) => {
    setEditedCar((prevCar) => ({
      ...prevCar,
      models: prevCar.models.map((model) =>
        model.id === modelId ? { ...model, name: newName } : model
      ),
    }));
  };

  const handleSaveChanges = () => {
    onSave(editedCar);
    window.location.reload();
  };

  return (
    <div className="modal">
      <h1>Edit {editedCar.name}</h1>
      <div className="modal__close" onClick={onClose}>
        &#10005;
      </div>
      <div>
        <label className='form__label' htmlFor="carName">Car Name:</label><br />
        <input
        className='form__input'
          type="text"
          id="carName"
          value={editedCar.name}
          onChange={handleEditCarName}
        />
      </div>
      {editedCar.models.map((model) => (
        <div key={model.id}>
          <label className='form__label' htmlFor={model.id}>Model Name:</label><br />
          <input
          className='form__input'
            type="text"
            id={model.id}
            value={model.name}
            onChange={(e) => handleEditModelName(model.id, e.target.value)}
          />
        </div>
      ))}
      <button className='form__button' onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
};

export default EditCar;