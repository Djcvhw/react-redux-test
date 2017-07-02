import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import initStore from './redux/store';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Router, Route, browserHistory} from 'react-router';

import Main from './layouts/Main';
import DepartmentsContainer from './containers/DepartmentsContainer';
import EmployeesContainer from './containers/EmployeesContainer';
import NotFound from './layouts/NotFound';

let store = initStore();

window.store = store;
ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider>
        <Router history={browserHistory}>
            <Route component={Main}>
                <Route path="/" component={DepartmentsContainer}/>
                <Route path="employees" component={EmployeesContainer}/>
            </Route>
            <Route path='*' component={NotFound}/>
        </Router>
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);