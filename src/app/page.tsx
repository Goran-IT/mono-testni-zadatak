"use client"
import { useEffect, useState } from "react"
import CarCard from "./components/CARS/car-card"
import DropDown from "./components/DROP-DOWN/drop-down"
import Pagination from "./components/PAGINATION/pagination"
import { observer } from "mobx-react";
import carStore from "./components/CARS/car-store"
import Search from "./components/SEARCH/search"
import NewCar from "./components/FORM/form"
import { dataHeaders } from "./components/CARS/cars-data"

const Home = observer(()=> {
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
    
    setCarList,
    setRpp,
    setPage,
    setNumberOfItems,
    setSearchArray,
    setSearch,
    setSortBy,
    
  } = carStore;

  const [newCar,setNewCar]= useState<boolean>(false)
    const newCardWindow =()=>{
      setNewCar(!newCar)
    }

  //Dohvacanje broja auta sa servera za logiku za searchanje
  setNumberOfItems(searchArray.length);

  //Funkcija za pretrazivanje
  const searchCars= () =>{
    fetch(`http://localhost:5000/cars?q=${search}`)
    .then((res) => {
      if(res.ok){
        return res.json();
      }
    })
    .then((data) => {
      setSearchArray(data)
    })
    .catch((err) => console.log(err))
  }
//Funkcija za dohvacanje sa servera
  const getCars=()=>{
    fetch(`http://localhost:5000/cars?_limit=${rpp}&_page=${page}&q=${search}`)
    .then((res) => {
      if(res.ok){
        return res.json();
      }
    })
    .then((data) => {
      //funkcija za sortiranje !! koja sortira iteme koji su trenutno vidljivi
      if(sortBy==="A-Z"){
        setCarList(data.sort((a:any, b:any) => a.name.localeCompare(b.name)));
    } else if(sortBy==="Z-A"){
        setCarList(data.sort((a:any, b:any) => b.name.localeCompare(a.name)));
    } else {
      setCarList(data)
    }
    })
    .catch((err) => console.log(err))
  }
//funkcija za brisanje
  const handleDelete =(id:string)=>{
    fetch(`http://localhost:5000/cars/${id}`, {
      method: "DELETE",
      headers: dataHeaders,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(() => {
        getCars()
        setSearch("")
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

 //Logika za searchanje
  useEffect(() => {
    searchCars()
  },[search])

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
  },[rpp, page, numberOfItems, search, sortBy, ])

  useEffect(() => {
    getCars()
  },[newCar])

  return (
    <>
      <button className="floating__button" onClick={()=>newCardWindow()}>+</button>
      {newCar && <>
      <div onClick={()=>newCardWindow()} className="modal__overlay"/>
      <div className="modal">
        <h1>Create New Car</h1><div onClick={()=>newCardWindow()} className="modal__close">	&#10005; </div>
        <NewCar />
      </div>
      </> }

      <main className="home">
        <h1>Aplikacija za pretrazivanje automobilak</h1>
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
})
export default Home
