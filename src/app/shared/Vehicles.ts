export interface Vehicles {
    id: string,
    fuel: string,
    modelId: {
      name: string,
      yearProd: number,
      manufacturerId: {
        name: string
      }
    }
  }