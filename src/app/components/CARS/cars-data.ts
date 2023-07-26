export type ModelType = {
    name:string;
    id:string;
  }
  
  export type CarType = {
      id:string;
      name:string;
      models:ModelType[];
    }
  
    export const dataHeaders = {
      "Content-Type": "application/json",
    };