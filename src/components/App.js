import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../actions';
import Header from './Header';
import LogIn from './LogIn';
import UsersList from './UsersList';
import '../style/index.scss';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {};

        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleLogIn = (formValues) => {
        const { loginUser } = this.props;

        loginUser(formValues);
    };

    handleLogOut = () => {
        const { logoutUser } = this.props;

        logoutUser();
    };

    render() {
        const { users: { loggedInUser, invalidCredentials } } = this.props;

        if(loggedInUser){
            return (
                <div className="ui container">
                    <Header isLoggedIn={!!loggedInUser} handleLogOut={this.handleLogOut}/>
                    <UsersList/>
                </div>
            );
        }

        return (
            <div className="ui container">
                <Header isLoggedIn={!!loggedInUser}/>
                <LogIn handleLogIn={this.handleLogIn} invalidCredentials={invalidCredentials}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(
    mapStateToProps,
    { loginUser, logoutUser }
)(App);