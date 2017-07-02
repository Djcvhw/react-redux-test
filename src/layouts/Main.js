import React from 'react';
import {connect} from "react-redux";
import {AppBar, Paper, Menu} from 'material-ui';
import {Grid, Row, Col} from 'react-bootstrap';
import {getDepartments, getEmployees} from '../redux/actions/main';
import NavItem from '../components/NavItem';

@connect(
  state => ({data: state.Main.data}),
  {getDepartments, getEmployees}
)

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.style = {
      paper: {
        display: 'inline-block',
        margin: '16px 32px 16px 0',
      }
    };
  }

  componentDidMount() {
    this.props.getDepartments().then(() => {
      this.props.getEmployees();
    });
  }

  render() {
    return <div>
      <AppBar
        title="React App"
        showMenuIconButton={false}
      />
      <Grid>
        <Row>
          <Col sm={3} md={3} lg={3}>
            <Paper style={this.style.paper}>
              <Menu>
                <NavItem path="/">Departments</NavItem>
                <NavItem path="employees">Employees</NavItem>
              </Menu>
            </Paper>
          </Col>
          <Col sm={8} md={8} lg={8}>
            {this.props.children}
          </Col>
        </Row>
      </Grid>
    </div>
  }
}

