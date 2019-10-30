import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogIn from './LogIn';
import UsersList from './UsersList';
import { LOGGED_IN } from '../constants';
import '../style/index.scss';

class App extends Component {
    render() {
        const loggedIn = !!localStorage.getItem(LOGGED_IN);

        if(loggedIn){
            return (
                <UsersList/>
            );
        }

        return (
            <LogIn/>
        );
    }
}

const mapStateToProps = state => state;

export default connect(
    mapStateToProps,
    {  }
)(App);