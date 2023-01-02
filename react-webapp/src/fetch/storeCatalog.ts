export interface ProductRates {
  id: number;
  rate: number;
}

export interface ProductTypes {
  name: string;
  id: string;
}

export interface Products {
  id: number;
  name: string;
  ProductTypes: ProductTypes;
  ProductRates: ProductRates[];
}

export interface StoreCatalog {
  price: number;
  Products: Products;
}

export interface Data {
  storeCatalog: StoreCatalog[];
}

export interface RootObject {
  data: Data;
}
