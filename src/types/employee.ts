
export enum Gender {
  male = 'male',
  female = 'female'
}

export type EmployeeGender = Gender;

export type EmployeeId = number;

export interface Employee {
  id: EmployeeId;
  name: string;
  department: string,
  age: number;
  salary: number;
  location: string;
  gender: EmployeeGender
}
