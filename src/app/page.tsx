"use client"
import { useEffect, useState } from "react"
import CarCard, { dataHeaders } from "./components/CARS/car-card"
import DropDown from "./components/DROP-DOWN/drop-down"
import Pagination from "./components/PAGINATION/pagination"
import { observer } from "mobx-react";
import carStore from "./components/CARS/car-store"
import Search from "./components/SEARCH/search"

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
    setRemoveSearch,
  } = carStore;
  
 

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
    } else{
      setCarList(data)
    }

    })
    .catch((err) => console.log(err))
  }
//funkcija za brisanje
  const handleDelete =(id:number)=>{
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
  },[rpp, page, numberOfItems, search, sortBy])

  return (
    <>
      <main className="home">
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
          onDelete={(id:number)=>handleDelete(id)}
          carBrands={carList} />
      </main>
    </>
  )
})
export default Home