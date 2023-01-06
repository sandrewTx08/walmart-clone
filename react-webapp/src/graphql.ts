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

export type Catalogs = {
  __typename?: 'Catalogs';
  Products: Products;
  id: Scalars['ID'];
  price: Scalars['Int'];
  product_id: Scalars['Int'];
};

export type ProductRates = {
  __typename?: 'ProductRates';
  id: Scalars['ID'];
  rate: Scalars['String'];
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
  ProductRates: Array<Maybe<ProductRates>>;
  ProductTypes: ProductTypes;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  department: ProductTypes;
  departments?: Maybe<Array<ProductTypes>>;
};


export type QueryDepartmentArgs = {
  department_id: Scalars['Int'];
};
