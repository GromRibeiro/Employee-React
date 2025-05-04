import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from './types';
import { calculateIRRF } from '../../utils/calculations';
import { saveEmployeeStorage, loadingEmployeeStorage } from './localStorage';
import { v4 as uuidv4 } from 'uuid';

interface EmployeeState {
  employee: Employee[];
}

const initialState: EmployeeState = {
    employee: loadingEmployeeStorage(),
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    createEmployee: (state, action: PayloadAction<Omit<Employee, 'id' | 'salarioBaseIR' | 'descontoIRRF'>>) => {
      const { nome, cpf, salarioBruto, descontoINSS, dependentes } = action.payload;
      const { salarioBaseIR, descontoIRRF } = calculateIRRF(salarioBruto, descontoINSS, dependentes);
      const newEmployee = {
        id: uuidv4(),
        nome,
        cpf,
        salarioBruto,
        descontoINSS,
        dependentes,
        salarioBaseIR,
        descontoIRRF,
      };
      state.employee.push(newEmployee);
      saveEmployeeStorage(state.employee);
    },
    
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.employee.findIndex(f => f.id === action.payload.id);
      if (index !== -1) {
        const { salarioBaseIR, descontoIRRF } = calculateIRRF(
          action.payload.salarioBruto,
          action.payload.descontoINSS,
          action.payload.dependentes
        );
        state.employee[index] = {
          ...action.payload,
          salarioBaseIR,
          descontoIRRF,
        };
        saveEmployeeStorage(state.employee);
      }
    },
    
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.employee = state.employee.filter(f => f.id !== action.payload);
      saveEmployeeStorage(state.employee);
    },
  },
});



export const { createEmployee, updateEmployee, deleteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
