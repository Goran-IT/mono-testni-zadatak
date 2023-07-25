import React from 'react'

export type ModelType = {
  name:string;
  id:number;
}

export type CarType = {
    id:number;
    name:string;
    models:ModelType[];
  }

  export const dataHeaders = {
    "Content-Type": "application/json",
  };
  
  type CarCardProps = {
    carBrands:CarType[];
    onDelete:(id:number)=>void;
}
const CarCard = ({carBrands,onDelete}:CarCardProps) => {
  return (
    <div className="card__wrapper">
        {carBrands.map((car)=>{
            return (
             <div className='card' key={car.id}>
              <img src={`https://source.unsplash.com/random/?${car.name}&logo`} alt="Car Logo" />
              <div className='card__info'>
              <h2>{car.name}</h2>
                 <div>
                     {car.models.map((model)=>{
                        return <div key={model.id}>{model.name}</div>
                     })}
                 </div>
                     <button onClick={()=> onDelete(car.id)}>🗑️</button>
              </div>
              
              </div>
             )
          })}
    </div>
  )
}

export default CarCard