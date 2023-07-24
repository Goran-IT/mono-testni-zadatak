import React from 'react'
type CarCardProps={
    carBrands:CarType[];
}
export type CarType={
    id:number;
    name:string;
    models:ModelType[];
  }
  
  type ModelType={
    name:string;
    id:number;
  }
const CardCard = ({carBrands}:CarCardProps) => {
  return (
    <div className="card-wrapper">
        {carBrands.map((car)=>{
            return (
             <div className='car-card' key={car.id}>
              <img src={`https://source.unsplash.com/random/?${car.name}_logo`} alt="Car Logo" />
              <div className='car-card-info'>
              <h2>{car.name}</h2>
                 <div>
                     {car.models.map((model)=>{
                        return <div key={model.id}>{model.name}</div>
                     })}
                 </div>
              </div>
              </div>
             )
          })}
    </div>
  )
}

export default CardCard