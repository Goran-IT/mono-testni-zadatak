import React from 'react'
import { CarType } from '../CARS/cars-data';
import { useEffect, useState } from "react"
import { observer } from 'mobx-react';
import carStore from '../CARS/car-store';

type SearchProps = {
    value:string;
    onSearch:(value:string) => void;
    searchResults:CarType[];
    chosenCar:(value:string) => void;
    removeText?:()=> void;
}

const Search = observer(({value,onSearch,searchResults,chosenCar,removeText}:SearchProps) => {
const { searchArray,setRemoveSearch,removeSearch } = carStore;

    const [results,setResults]=useState<boolean>(false)
    const [currentValue,setCurrentValue]=useState<string>(value)

    const toggleResults = (event:any)=>{
        if(event.code ==="Enter"){
            setResults(!results)
        }
    }

    useEffect(()=>{
        for (let i = 0; i < searchArray.length; i++) {
            if(searchArray[i].name===value){
                setTimeout(()=>{
                    setResults(false)
                },10)
            }
        }

        if(value===""){
            setResults(false)
            setRemoveSearch(false)
        } else if(value){
            setResults(true)
            setRemoveSearch(true)
        } 
        setCurrentValue(value)
    },[value])
  return (
    <>
    <div>
    <div className='search__relative'>

    <input 
    className='search'
    type="text"
    placeholder='Search Cars'
    onKeyDown={(event)=>toggleResults(event)}
    value={currentValue}
    onChange={(e) => onSearch(e.target.value)}
    />
    {removeSearch && 
    <button className='search__remove' onClick={removeText}>&#10005;</button>
    }
    </div>
    {results && (
    <div className="search__results">
          {searchResults.map((item)=>{
            return <div key={item.id}
            className="search__item"
             onClick={()=>{
                chosenCar(item.name)
                setResults(false)
            }}
            >
              {item.name}
            </div>
          })}
          </div>
    )}
        </div>
    </>
  )
})

export default Search