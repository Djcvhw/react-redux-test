import React from 'react';
import {connect} from "react-redux";
import {FlatButton, Dialog, TextField, SelectField, MenuItem} from 'material-ui';
import {Row, Col} from 'react-bootstrap';
import EssenceTable from './EssenceTable';
import {addEmployee, deleteEmployee} from '../redux/actions/main'

@connect(
  state => ({
    departments: state.Main.departments,
    employees: state.Main.employees
  }),
  {addEmployee, deleteEmployee}
)

export default class EmployeeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: this.props.employees,
      departments: this.props.departments,
      window: false,
      nameValue: 'Name',
      lastNameValue: 'Last Name',
      departmentValue: null,
      departmentName: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.employees.length !== this.props.employees.length) {
      this.setState({employees: nextProps.employees});
    }
  }

  showWindow() {
    this.setState({window: !this.state.window});
  }

  addEmployee() {
    this.props.addEmployee({
      firstName: this.state.nameValue,
      lastName: this.state.lastNameValue,
      departmentId: this.state.departmentValue,
      department: this.state.departmentName
    });
    this.showWindow();
  }

  changeName(event, nameValue) {
    this.setState({nameValue});
  }

  changeLastName(event, lastNameValue) {
    this.setState({lastNameValue});
  }

  changeDepartment(event, index, departmentValue) {
    this.setState({departmentValue, departmentName: event.target.innerText});
  }

  deleteEmployee(id){
    this.props.deleteEmployee(id);
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={::this.showWindow}
      />,
      <FlatButton
        label="Add"
        primary={true}
        onTouchTap={::this.addEmployee}
      />,
    ];
    return <div>
      <h1>Employees</h1>
      <Row>
        <Col sm={3} md={3} lg={3}>
          <FlatButton label="Add Employee" primary={true} onTouchTap={::this.showWindow}/>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12} lg={12}>
            <EssenceTable essences={this.state.employees} department={true} name="All employees" deleteEssence={::this.deleteEmployee}/>
        </Col>
      </Row>
      <Dialog
        title="Add Employee"
        modal={false}
        open={this.state.window}
        onRequestClose={::this.showWindow}
        actions={actions}
      >
        <TextField
          hintText="Name"
          value={this.state.nameValue}
          onChange={::this.changeName}
        /><br />
        <TextField
          hintText="Last Name"
          value={this.state.lastNameValue}
          onChange={::this.changeLastName}
        /><br />
        <SelectField
          floatingLabelText="Department"
          value={this.state.departmentValue}
          onChange={::this.changeDepartment}
        >
          <MenuItem value={null} primaryText=""/>
          {this.state.departments.map((department, idx) => {
            return <MenuItem value={department.id} primaryText={department.name} key={`item_${idx}`}/>
          })}
        </SelectField>
      </Dialog>
    </div>
  }
}