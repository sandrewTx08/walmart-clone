export interface Department {
  name: string;
  id: number;
  _count: number;
}

export interface Data {
  departments: Department[];
}

export interface RootObject {
  data: Data;
}
