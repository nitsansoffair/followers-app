import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../actions/userActions';
import Header from './Header';
import LogIn from './LogIn';
import UsersList from './UsersList';
import { LOGGED_IN } from '../constants';
import '../style/index.scss';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {};

        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    componentDidMount() {
        const isLoggedIn = localStorage.getItem(LOGGED_IN);

        this.setState({
            isLoggedIn
        });
    }

    handleLogIn = (formValues) => {
        const { loginUser } = this.props;

        loginUser(formValues);
    };

    handleLogOut = () => {
        const { logoutUser } = this.props;

        logoutUser();

        this.setState({
            isLoggedIn: false
        });
    };

    render() {
        const { users: { loggedInUser, invalidCredentials } } = this.props;
        const { isLoggedIn } = this.state;

        if(loggedInUser || isLoggedIn){
            return (
                <div className="ui container">
                    <Header isLoggedIn={!!loggedInUser || isLoggedIn} handleLogOut={this.handleLogOut}/>
                    <UsersList/>
                </div>
            );
        }

        return (
            <div className="ui container">
                <Header isLoggedIn={!!loggedInUser || isLoggedIn}/>
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