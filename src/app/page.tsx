"use client"
import { useEffect,useState } from "react"
import CarCard from "./components/CARS/car-card"
import DropDown from "./components/DROP-DOWN/drop-down"
import Pagination from "./components/PAGINATION/pagination"
import { observer } from "mobx-react";
import carStore from "./components/CARS/car-store"
import Search from "./components/SEARCH/search"
import NewCar from "./components/FORM/createNewCarForm"
import { CarType } from "./components/CARS/cars-data"
import HttpClient from "./components/CARS/HttpClient"

const httpClient = new HttpClient('http://localhost:5000/cars')
const Home = ()=> {
  const { 
    carList,
    rpp,
    page,
    numberOfItems,
    rppOptions,
    sortingOptions,
    searchArray,
    search,
    sortBy,
    newCar,
    showEditModal,
    setCarList,
    setRpp,
    setPage,
    setNumberOfItems,
    setSearchArray,
    setSearch,
    setSortBy,
    setNewCar,
  } = carStore;


  

  //Funkcija za pretrazivanje
  const searchCars = async () => {
    try {
      const data = await httpClient.get<CarType[]>(`/?q=${search}`);
      setSearchArray(data);
    } catch (error) {
      console.error(error);
    }
  };

//Funkcija za dohvacanje sa servera
  const getCars = async () => {
    try {
      const data = await httpClient.get<CarType[]>(`/?_limit=${rpp}&_page=${page}&q=${search}`);
      if(sortBy==="A-Z"){
        setCarList(data.sort((a:CarType, b:CarType) => a.name.localeCompare(b.name)));
    } else if(sortBy==="Z-A"){
        setCarList(data.sort((a:CarType, b:CarType) => b.name.localeCompare(a.name)));
    } else {
      setCarList(data)
    }
    } catch (error) {
      console.error(error);
    }
  };
//funkcija za brisanje
const handleDelete = async (id: string) => {
  try {
    await httpClient.delete<CarType[]>(`/${id}`);
    const updatedData = await httpClient.get<CarType[]>(`/?_limit=${rpp}&_page=${page}&q=${search}`);
      setCarList(updatedData);
      setSearchArray(updatedData);
  } catch (error) {
    console.error(error);
  }
};

 //Logika za searchanje
  useEffect(() => {
    searchCars()
    getCars()
    
  },[search,numberOfItems])

  //Logika za loadanje paginacije
  useEffect(() => {
    if (numberOfItems > 0) {
      const numOfPages = Math.ceil(numberOfItems / rpp);
      if (page > numOfPages) {
        setPage(numOfPages);
      } else {
        getCars() 
      }
    }    
    
  },[rpp, page, numberOfItems, search, sortBy,showEditModal,newCar ])
  
  useEffect(() => {
  },[])
  
    //Dohvacanje broja auta sa servera za logiku za searchanje
  setNumberOfItems(searchArray.length);
  
  return (
    <>
      <button className="floating__button" onClick={()=>setNewCar(true)}>+</button>

      {newCar && <>
      <div onClick={()=>setNewCar(false)} className="modal__overlay"/>
      <div className="modal">
        <h1>Create New Car</h1><div onClick={()=>setNewCar(false)} className="modal__close">	&#10005; </div>
        <NewCar />
      </div>
      </> }

      <main className="home">
        <h1>Mono Testni Zadatak</h1>
        <p>Ova aplikacija za prikazivanje automobila sadrži sisteme za:</p>
        <ul>
          <li>sortiranje</li>
          <li>pretraživanje</li>
          <li>paginaciju</li>
          <li>filter za prikazivanje broja kartica po stranici</li>
          <li>brisanje kartica</li>
          <li>dodavanje kartica</li>
          <li>uređivanje kartica</li>
        </ul>
        <p>Ova aplikacija koristi "fake" REST API server koji je pokrenut lokalno
          pomoću komande <b>npx json-server --watch db.json --port 5000</b> koja se upiše u terminal.
        </p>
        <div className="home__div">
          <h1>Car Brands</h1>
          <DropDown
          options={sortingOptions}
          placeholder="Sort"
          onChange={(active)=>setSortBy(active.value)}
          />
        </div>
        <div className="home__header">
          <div>
          <Search
          onSearch={setSearch} 
          value={search}
          searchResults={searchArray}
          chosenCar={(e)=> setSearch(e)}
          removeText={()=>setSearch("")}
          />
         
          </div>
          <Pagination
           numOfPages={Math.ceil(numberOfItems / rpp)}
           activePage={page}
           onPaginate={(activePages) => setPage(activePages)}
          />
          <DropDown options={rppOptions}
          onChange={(activeRpp) => setRpp(Number(activeRpp.value))}
          defaultValue={rppOptions[0]}
          placeholder="Show"
          />
        </div>
          <CarCard
          onDelete={(id:string)=>handleDelete(id)}
          carBrands={carList} />
      </main>
    </>
  )
}
export default observer(Home)