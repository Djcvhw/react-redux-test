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
import {_REQUEST} from '../constants/baseTypes';

function getEmployees() {
  return {
    type: GET_EMPLOYEES + _REQUEST,
    endpoint: 'employees',
  }
}

function getEmployee(id) {
  return {
    type: GET_EMPLOYEE + _REQUEST,
    endpoint: `employees/${id}`,
  }
}

function getDepartments() {
  return {
    type: GET_DEPARTMENTS + _REQUEST,
    endpoint: 'departments'
  };
}

function getDepartment(id) {
  return {
    type: GET_DEPARTMENT + _REQUEST,
    endpoint: `departments/${id}`
  };
}

function addEmployee(employee) {
  return {
    type: ADD_EMPLOYEE,
    employee
  }
}
function deleteEmployee(id) {
  return {
    type: DELETE_EMPLOYEE,
    id
  }
}

function addDepartment(department) {
  return {
    type: ADD_DEPARTMENT,
    department
  }
}
function deleteDepartment(id) {
  return {
    type: DELETE_DEPARTMENT,
    id
  }
}

export {
  getEmployees,
  getEmployee,
  getDepartments,
  getDepartment,
  addEmployee,
  deleteEmployee,
  addDepartment,
  deleteDepartment
}