import { defineStore } from 'pinia';
import employeesService from '@/services/employees'
import type { Employee, EmployeeId } from '@/types/employee'
import type { FilterCriteria } from '@/types/filter-criteria'
import { Loading, Notify } from 'quasar'

type EmployeeStoreId = 'employee'
interface EmployeeStoreState {
  employees: Employee[];
  filterCriteria: FilterCriteria
}
interface EmployeeStoreActions {
  getEmployees: () => Promise<void>
  addEmployee: (employee: Omit<Employee, 'id'>) => Promise<void>
  updateEmployee: (updatedEmployee: Employee) => Promise<void>
  deleteEmployee: (id: EmployeeId) => Promise<void>
  setFilterCriteria: (criteria: FilterCriteria) => void;
}
export const useEmployeeStore = defineStore<EmployeeStoreId, EmployeeStoreState, any, EmployeeStoreActions>('employee', {
  state: (): EmployeeStoreState => ({
    employees: [],
    filterCriteria: {},
  }),

  actions: {
    async getEmployees() {
      const url = new URLSearchParams();
      Object.keys(this.filterCriteria).forEach(key => {
        if (!!this.filterCriteria[key]) {
          url.set(key, this.filterCriteria[key]);
        }
      })
      const filterStr = '?' + url.toString();

      Loading.show();
      try {
        this.employees = await employeesService.getEmployees(filterStr);
      } catch (error) {
        console.error('Error fetching employees:', error);
        Notify.create({ type: 'negative', message: 'Failed to load employees' });
      } finally {
        Loading.hide();
      }
    },
    async addEmployee(employee: Omit<Employee, 'id'>) {
      Loading.show();
      try {
        const newEmployee = await employeesService.createEmployee(employee);
        this.employees.push(newEmployee);
        Notify.create({ type: 'positive', message: 'Employee added successfully!' });
      } catch (error) {
        console.error('Error adding employee:', error);
        Notify.create({ type: 'negative', message: 'Failed to add employee' });
      } finally {
        Loading.hide();
      }
    },
    async updateEmployee(updatedEmployee: Employee) {
      Loading.show();
      try {
        await employeesService.updateEmployee(updatedEmployee);
        const index = this.employees.findIndex(emp => emp.id === updatedEmployee.id);
        if (index !== -1) this.employees[index] = updatedEmployee;
        Notify.create({ type: 'positive', message: 'Employee updated successfully!' });
      } catch (error) {
        console.error('Error updating employee:', error);
        Notify.create({ type: 'negative', message: 'Failed to update employee' });

      } finally {
        Loading.hide();
      }
    },
    async deleteEmployee(id: EmployeeId) {
      Loading.show();
      try {
        await employeesService.deleteEmployee(id);
        this.employees = this.employees.filter(emp => emp.id !== id);
        Notify.create({ type: 'positive', message: 'Employee deleted successfully!' });
      } catch (error) {
        console.error('Error deleting employee', error)
        Notify.create({ type: 'negative', message: 'Failed to delete employee' });
      } finally {
        Loading.hide();
      }
    },
    setFilterCriteria(criteria: FilterCriteria) {
      this.filterCriteria = criteria;
    },
  },
});
