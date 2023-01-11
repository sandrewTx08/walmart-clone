export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Brands = {
  __typename?: 'Brands';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Catalogs = {
  __typename?: 'Catalogs';
  Products: Products;
  id: Scalars['ID'];
  price: Scalars['Int'];
  product_id: Scalars['ID'];
};

export type ProductRates = {
  __typename?: 'ProductRates';
  User: User;
  _count: Scalars['Int'];
  description: Scalars['String'];
  id: Scalars['ID'];
  rate: Scalars['Int'];
  user_id: Scalars['String'];
};

export type ProductTypes = {
  __typename?: 'ProductTypes';
  _count: Scalars['Int'];
  catalog?: Maybe<Array<Catalogs>>;
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type ProductTypesCatalogArgs = {
  limit: Scalars['Int'];
  store_id?: InputMaybe<Scalars['Int']>;
};

export type Products = {
  __typename?: 'Products';
  Brands: Brands;
  ProductRates: Array<Maybe<ProductRates>>;
  ProductTypes: ProductTypes;
  brand_id: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type ProductsProductRatesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  catalog: Catalogs;
  department: ProductTypes;
  departments?: Maybe<Array<ProductTypes>>;
};


export type QueryCatalogArgs = {
  catalog_id: Scalars['Int'];
};


export type QueryDepartmentArgs = {
  department_id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  first_name: Scalars['String'];
  id: Scalars['ID'];
};
