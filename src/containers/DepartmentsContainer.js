import React from 'react';
import {connect} from "react-redux";
import {
  FlatButton,
  Dialog,
  TextField,
  TableRowColumn,
  TableRow,
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody
} from 'material-ui';
import {Row, Col, Button} from 'react-bootstrap';
import {addDepartment, deleteDepartment} from '../redux/actions/main';


@connect(
  state => ({
    departments: state.Main.departments
  }),
  {addDepartment, deleteDepartment}
)

export default class DepartmentsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: this.props.departments,
      window: false,
      nameValue: 'Name',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.departments.length !== this.props.departments.length) {
      this.setState({departments: nextProps.departments});
    }
  }

  showWindow() {
    this.setState({window: !this.state.window});
  }

  addDepartment() {
    this.props.addDepartment({
      id: this.state.departments.length,
      name: this.state.nameValue
    });
    this.showWindow();
  }

  changeName(event, nameValue) {
    this.setState({nameValue});
  }

  deleteDepartment(id){
    this.props.deleteDepartment(id);
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
        onTouchTap={::this.addDepartment}
      />,
    ];
    return <div>
      <h1>Departments</h1>
      <Row>
        <Col sm={3} md={3} lg={3}>
          <FlatButton label="Add Department" primary={true} onTouchTap={::this.showWindow}/>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12} lg={12}>
          <Table>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn colSpan={3} style={{textAlign: 'center'}}>
                  All departments
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn>Id</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Action</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
            >
              {this.state.departments.map((row, idx) => {
                return <TableRow key={`row-item_${idx}`}>
                  <TableRowColumn>{row.id}</TableRowColumn>
                  <TableRowColumn>{row.name}</TableRowColumn>
                  <TableRowColumn><Button bsStyle="link" onClick={this.deleteDepartment.bind(this, row.id)}>Delete</Button></TableRowColumn>
                </TableRow>
              })}
            </TableBody>
          </Table>
        </Col>
      </Row>
      <Dialog
        title="Add Department"
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
      </Dialog>
    </div>
  }
}