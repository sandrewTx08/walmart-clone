export interface Department {
  name: string;
  id: number;
}

export interface Data {
  departments: Department[];
}

export interface RootObject {
  data: Data;
}
