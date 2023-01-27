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
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Carts = {
  __typename?: 'Carts';
  catalog_id: Scalars['Int'];
  image: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Int'];
  product_id: Scalars['Int'];
  quantity: Scalars['Int'];
  user_id: Scalars['ID'];
};

export type Catalogs = {
  __typename?: 'Catalogs';
  Products: Products;
  id: Scalars['Int'];
  price: Scalars['Int'];
  product_id: Scalars['Int'];
};

export type Departments = {
  __typename?: 'Departments';
  _count: Scalars['Int'];
  catalog?: Maybe<Array<Catalogs>>;
  id: Scalars['Int'];
  name: Scalars['String'];
};


export type DepartmentsCatalogArgs = {
  brand_id?: InputMaybe<Scalars['Int']>;
  limit: Scalars['Int'];
  store_id?: InputMaybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  cartAdd?: Maybe<Carts>;
  cartDelete?: Maybe<Carts>;
};


export type MutationCartAddArgs = {
  catalog_id: Scalars['Int'];
  quantity: Scalars['Int'];
  user_id: Scalars['ID'];
};


export type MutationCartDeleteArgs = {
  catalog_id: Scalars['Int'];
  quantity: Scalars['Int'];
  user_id: Scalars['ID'];
};

export type ProductRates = {
  __typename?: 'ProductRates';
  Users: Users;
  _count: Scalars['Int'];
  description: Scalars['String'];
  id: Scalars['Int'];
  product_id: Scalars['Int'];
  rate: Scalars['String'];
  user_id: Scalars['ID'];
};

export type Products = {
  __typename?: 'Products';
  Brands: Brands;
  Departments: Departments;
  ProductRates: Array<Maybe<ProductRates>>;
  brand_id: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
};


export type ProductsProductRatesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  cart: Array<Maybe<Carts>>;
  catalog: Catalogs;
  department: Departments;
  departments?: Maybe<Array<Departments>>;
  productBrands?: Maybe<Array<Brands>>;
};


export type QueryCartArgs = {
  user_id: Scalars['ID'];
};


export type QueryCatalogArgs = {
  catalog_id: Scalars['Int'];
};


export type QueryDepartmentArgs = {
  department_id: Scalars['Int'];
};


export type QueryProductBrandsArgs = {
  department_id: Scalars['Int'];
};

export type Users = {
  __typename?: 'Users';
  first_name: Scalars['String'];
  id: Scalars['String'];
};
