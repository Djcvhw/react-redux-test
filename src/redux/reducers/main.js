import {
  GET_DEPARTMENTS,
  GET_DEPARTMENT,
  GET_EMPLOYEES,
  GET_EMPLOYEE,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  ADD_DEPARTMENT,
  DELETE_DEPARTMENT
} from '../constants/actionTypes';
import {_SUCCESS} from '../constants/baseTypes';

const defaultState = {
  departments: [],
  department: null,
  employees: [],
  employee: null
};

export function Main(state = defaultState, action) {
  switch (action.type) {
    case GET_DEPARTMENTS + _SUCCESS:
      return {
        ...state,
        departments: action.result,
      };
    case GET_DEPARTMENT + _SUCCESS:
      return {
        ...state,
        department: action.result,
      };
    case GET_EMPLOYEES + _SUCCESS:
      return {
        ...state,
        employees: normalizeEmployees(action.result, state.departments),
      };
    case GET_EMPLOYEE + _SUCCESS:
      return {
        ...state,
        employee: action.result,
      };
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [].concat(state.employees, action.employee)
      };
      case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: [].concat(state.employees).filter(employee => {
          return employee.id !== action.id
        })
      };
    case ADD_DEPARTMENT:
      return {
        ...state,
        departments: [].concat(state.departments, action.department)
      };
    case DELETE_DEPARTMENT:
      return {
        ...state,
        departments: [].concat(state.departments).filter(department => {
          return department.id !== action.id
        })
      }
  }
  return state;
}

function normalizeEmployees(employees, departments) {
  return employees.map(employee => {
    departments.map(department => {
      if (department.id === employee.departmentId) {
        employee.department = department.name;
      }
    });
    return employee;
  });
}