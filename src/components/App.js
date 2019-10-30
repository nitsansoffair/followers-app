import React, { Component } from 'react';
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

export default App;