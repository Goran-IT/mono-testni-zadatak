import React, { useState } from 'react';
import { ModelType, CarType } from '../CARS/cars-data';
import { v4 as uuidv4 } from 'uuid';
import carStore from '../CARS/car-store';
import HttpClient from '../CARS/HttpClient';
import { observer } from 'mobx-react';

export type ErrorType={
  nameError:string;
  modelError:string
}

const NewCar= () => {
  const httpClient = new HttpClient('http://localhost:5000/cars'); 
  const {setNumberOfItems,numberOfItems,setNewCar} = carStore;
//Ovdje koristim lokalne varijable pošto MobX daje puno errora
  const [newCarName, setNewCarName] = useState<string>('');
  const [newModelName, setNewModelName] = useState<string>('');
  const [models, setModels] = useState<ModelType[]>([]);
  const [error, setError] = useState<ErrorType>({ nameError: '', modelError: '' });

  const handleAddModel = () => {
    if (newModelName.trim() !== '') {
      setModels((prevModels) => [...prevModels, { id: uuidv4(), name: newModelName }]);
      setNewModelName('');
    }
  };
  const toggleKeyPress = (event:any)=>{
    if(event.code ==="Enter"){
      handleAddModel()
    }
}

const handleSaveCar = async () => {
  // Reset validation errors
  setError((prevError) => ({
    ...prevError,
    nameError: '', // Reset name error
    modelError: '', // Reset model error
  }));

  if (newCarName === "") {
    setError((prevError) => ({ ...prevError, nameError: 'Name is required' }));
  } else if (models.length === 0) {
    setError((prevError) => ({ ...prevError, modelError: 'At least one model is required' }));
  } else {
    try {
      const addNewCar: CarType = {
        id: uuidv4(),
        name: newCarName,
        models: models,
      };

      await httpClient.post<CarType>('/', addNewCar);
      setNewCar(false);
      setNumberOfItems(numberOfItems + 1);
    } catch (error) {
      console.error('Error saving new car:', error);
    }
  }
};

  return (
    <div className="form">

      <div>
        <label className='form__label' htmlFor="newCarName">Car Name:</label>
        <input
        className='form__input'
          type="text"
          id="newCarName"
          value={newCarName}
          onChange={(e) => setNewCarName(e.target.value)}
        />
      </div>
      {error.nameError && <p className='form__label--red'>{error.nameError}</p> }
      <div>
        <label className='form__label' htmlFor="newModelName">Model Name:</label>
        <input
        className='form__input'
          type="text"
          id="newModelName"
          value={newModelName}
          onChange={(e) => setNewModelName(e.target.value)}
          onKeyDown={(event)=>toggleKeyPress(event)} 
        />
        <button className='form__add' onClick={handleAddModel}>+</button>
        {error.modelError && <p className='form__label--red'>{error.modelError}</p> }
        <br />

      </div>
      
      <div className="model-list">
        {models.map((model) => (
          <ul key={model.id}>
            <li>{model.name}</li>
          </ul>
        ))}
      </div>
      <button className='form__button' onClick={()=>{
        handleSaveCar()
       // window.location.reload();
      }}>Add Car</button>
    </div>
  );
};

export default observer(NewCar);