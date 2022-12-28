export interface Department {
  name: string;
}

export interface Data {
  departments: Department[];
}

export interface RootObject {
  data: Data;
}
