import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import MenuItem from 'material-ui/MenuItem';

export default class NavItem extends React.Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return <Link to={this.props.path}>
      <MenuItem primaryText={this.props.children}/>
    </Link>
  }
}
