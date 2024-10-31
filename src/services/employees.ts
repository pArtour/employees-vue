import api from '@/lib/api'
import type { Employee, EmployeeId } from '@/types/employee'

async function getEmployees(query: string = '') {
  try {
    const response = await api.get<Employee[]>('/employees' + query);
    return response.data;
  } catch (e) {
    console.log('Error: ', e);
    throw e;
  }
}

async function createEmployee(employee: Omit<Employee, 'id'>) {
  console.log(employee)
  try {
    const response = await api.post<Employee>('/employees', employee);
    return response.data;
  } catch (e) {
    console.log('Error: ', e);
    throw e;
  }
}

async function updateEmployee(updatedEmployee: Employee) {
  try {
    console.log(updatedEmployee)
    await api.put(`/employees/${updatedEmployee.id}`, updatedEmployee);
  } catch (e) {
    console.log('Error: ', e);
    throw e;
  }
}

async function deleteEmployee(id: EmployeeId) {
  try {
    await api.delete('/employees/' + id);
  } catch (e) {
    console.log('Error: ', e);
    throw e;
  }
}


export default {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
}
