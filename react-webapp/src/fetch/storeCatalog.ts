export interface ProductTypes {
  name: string;
  id: string;
}

export interface Products {
  ProductTypes: ProductTypes;
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
