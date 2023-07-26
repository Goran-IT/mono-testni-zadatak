import React, { useState } from 'react';
import { ModelType, CarType, dataHeaders } from '../CARS/cars-data';
import { v4 as uuidv4 } from 'uuid';



const NewCar= () => {
  const [newCarName, setNewCarName] = useState<string>('');
  const [newModelName, setNewModelName] = useState<string>('');
  const [models, setModels] = useState<ModelType[]>([]);
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
  const handleSaveCar = () => {
    if (newCarName.trim() !== '') {
      const newCar: CarType = {
        id: uuidv4(),
        name: newCarName,
        models: models,
      };

      fetch('http://localhost:5000/cars', {
        method: 'POST',
        headers: dataHeaders,
        body: JSON.stringify(newCar),
      })
        .then((res) => {
        })
        .then((data)=>{
        })
        .catch((err) => console.log(err));
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
        window.location.reload();
      }}>Add Car</button>
    </div>
  );
};

export default NewCar;