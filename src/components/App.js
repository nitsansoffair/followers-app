import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import LogIn from './LogIn';
import UsersList from './UsersList';
import { LOGGED_IN } from '../constants';
import '../style/index.scss';

class App extends Component {
    render() {
        const loggedIn = !!localStorage.getItem(LOGGED_IN);

        if(loggedIn){
            return (
                <div className="ui container">
                    <Header loggedIn={loggedIn}/>
                    <UsersList/>
                </div>
            );
        }

        return (
            <div className="ui container">
                <Header loggedIn={loggedIn}/>
                <LogIn/>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(
    mapStateToProps,
    {  }
)(App);