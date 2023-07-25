import { observable, action, makeObservable } from "mobx";
import { CarType } from "./car-card";
import { OptionType } from "../DROP-DOWN/drop-down";

class CarStore {
  carList: CarType[] = [];
  rpp: number = 8;
  page: number = 1;
  numberOfItems: number = 1;
  searchArray: CarType[] = [];
  search: string = "";
  sortBy:string= "";
  removeSearch:boolean = false;

  rppOptions: OptionType[] = [
    {
      label:"8",
      value: "8",
    },
    {
      label:"16",
      value: "16",
    },
    {
      label:"20",
      value: "20",
    },
  ];

  sortingOptions:OptionType[] =[
    {
      value:"A-Z",
      label:"Alphabetical A-Z"
    },
    {
      value:"Z-A",
      label:"Alphabetical Z-A"
    },
  ]

  constructor() {
    makeObservable(this, {
      carList: observable,
      setCarList: action,
      rpp: observable,
      setRpp: action,
      page: observable,
      setPage: action,
      numberOfItems: observable,
      setNumberOfItems: action,
      searchArray: observable,
      setSearchArray: action,
      search: observable,
      setSearch: action,
      sortBy:observable,
      setSortBy:action,
      removeSearch:observable,
      setRemoveSearch:action,
    });
  }

  setCarList = (newCarList: CarType[]) => {
    this.carList = newCarList;
  };

  setRpp = (newRpp: number) => {
    this.rpp = newRpp;
  };

  setPage = (newPage: number) => {
    this.page = newPage;
  };

  setNumberOfItems = (newNumberOfItems: number) => {
    this.numberOfItems = newNumberOfItems;
  };
   setSearchArray = (newSearchArray: CarType[]) => {
    this.searchArray = newSearchArray;
  };
   setSearch = (newSearch: string) => {
    this.search = newSearch;
  };
  setSortBy = (newSortBy:string) => {
    this.sortBy = newSortBy;
  };
  setRemoveSearch = (newRemoveSearch:boolean) => {
    this.removeSearch = newRemoveSearch;
  }
}

const carStore = new CarStore();
export default carStore;