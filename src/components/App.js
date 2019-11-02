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
        this.setState({
            isLoggedIn: localStorage.getItem(LOGGED_IN)
        });
    }

    handleLogIn = (formValues) => this.props.loginUser(formValues);

    handleLogOut = () => {
        this.props.logoutUser();

        this.setState({
            isLoggedIn: false
        });
    };

    render() {
        const { users: { loggedInUser, invalidCredentials } } = this.props;
        const { isLoggedIn } = this.state;
        const isUserLoggedIn = !!loggedInUser || isLoggedIn;

        if(isUserLoggedIn){
            return (
                <div className="ui container">
                    <Header isLoggedIn={isUserLoggedIn} handleLogOut={this.handleLogOut}/>
                    <UsersList/>
                </div>
            );
        }

        return (
            <div className="ui container">
                <Header isLoggedIn={isUserLoggedIn}/>
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