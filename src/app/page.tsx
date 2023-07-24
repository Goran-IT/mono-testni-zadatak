"use client"
import { useEffect, useState } from "react"
import CardCard, { CarType } from "./components/CARS/car-card"
import DropDown, { OptionType } from "./components/DROP-DOWN/drop-down"
import Pagination from "./components/PAGINATION/pagination"

function Home() {
  const [carList,setCarList] = useState<CarType[]>([])
  const [rpp, setRpp] = useState<number>(4);
  const [page,setPage] = useState<number>(1)
  const [numberOfItems,setNumberOfItems] = useState<number>(1)

  const rppOptions: OptionType[] = [
    {
      value: "4",
    },
    {
      value: "8",
    },
    {
      value: "16",
    },
  ];
//Dohvacanje broja zivotinja
const getCarsCount = () => {
  fetch(`http://localhost:5000/cars`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      setNumberOfItems(data.length);
    })
    .catch((err) => console.log(err));
};

  const getCars=()=>{
    fetch(`http://localhost:5000/cars?_limit=${rpp}&_page=${page}`)
    .then((res) => {
      if(res.ok){
        return res.json();
      }
    })
    .then((data) => {
      setCarList(data)
    })
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    getCarsCount()
//Settanje paginacije 
  },[])
  useEffect(() => {
    if (numberOfItems > 0) {
      const numOfPages = Math.ceil(numberOfItems / rpp);
      if (page > numOfPages) {
        setPage(numOfPages);
      } else {
        getCars();
      }
    }    
  },[rpp, page, numberOfItems])

  return (
    <>
      <main className="home">
        <div className="home-header">
          <h1>Car Brands</h1>
          <Pagination
           numOfPages={Math.ceil(numberOfItems / rpp)}
           activePage={page}
           onPaginate={(activePages) => setPage(activePages)}
          />
          <DropDown options={rppOptions}
          onChange={(activeRpp) => setRpp(Number(activeRpp.value))}
          defaultValue={rppOptions[0]}
          />
        </div>
          <CardCard carBrands={carList} />
      </main>
    </>
  )
}
export default Home