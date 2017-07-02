import React from 'react';
import {Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn} from 'material-ui';
import {Button} from 'react-bootstrap';

export default class EssenceTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      essences: this.props.essences,
      name: this.props.name
    };
    this.style = {
      pointer: {
        cursor: 'pointer'
      }
    }
  }

  sortingEssences(e) {
    let value = e.target.dataset.name;
    let sort = e.target.dataset.sort;
    let essences = [].concat(this.state.essences);
    let collator = new Intl.Collator();
    essences.sort((emp1, emp2) => {
      if (sort === "asc") {
        return collator.compare(emp1[value], emp2[value]);
      } else {
        return collator.compare(emp2[value], emp1[value]);
      }
    });
    this.setState({essences});
    if (sort === "asc") {
      e.target.dataset.sort = "desc";
    } else {
      e.target.dataset.sort = "asc";
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.essences.length !== this.props.essences.length) {
      this.setState({essences: nextProps.essences});
    }
  }

  deleteEssence(id){
    this.props.deleteEssence(id);
  }

  render() {
    return <Table>
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
      >
        <TableRow>
          <TableHeaderColumn colSpan={4} style={{textAlign: 'center'}}>
            {this.state.name}
          </TableHeaderColumn>
        </TableRow>
        <TableRow>
          <TableHeaderColumn><span style={this.style.pointer}
                                   onClick={::this.sortingEssences} data-sort="asc"
                                   data-name="firstName">Name</span></TableHeaderColumn>
          <TableHeaderColumn><span style={this.style.pointer}
                                   onClick={::this.sortingEssences} data-sort="asc"
                                   data-name="lastName">Last Name</span></TableHeaderColumn>
          <TableHeaderColumn>Department</TableHeaderColumn>
          <TableHeaderColumn>Action</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={false}
      >
        {this.state.essences.map((row, idx) => {
          return <TableRow key={`row-item_${idx}`}>
            <TableRowColumn>{row.firstName}</TableRowColumn>
            <TableRowColumn>{row.lastName}</TableRowColumn>
            <TableRowColumn>{row.department}</TableRowColumn>
            <TableRowColumn><Button bsStyle="link"
                                    onClick={this.deleteEssence.bind(this, row.id)}>Delete</Button></TableRowColumn>
          </TableRow>
        })}
      </TableBody>
    </Table>
  }
}