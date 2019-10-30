import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions';
import Header from './Header';
import LogIn from './LogIn';
import UsersList from './UsersList';
import { LOGGED_IN } from '../constants';
import '../style/index.scss';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {};

        this.handleLogOut = this.handleLogOut.bind(this);
    }

    componentDidMount() {
        const isLoggedIn = !!localStorage.getItem(LOGGED_IN);

        this.setState({
            isLoggedIn
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props !== prevProps){
            const { users: { loggedInUser } } = this.props;

            if(loggedInUser){
                this.setState({
                    isLoggedIn: true
                });
            }
        }
    }

    handleLogOut = () => {
        localStorage.removeItem(LOGGED_IN);

        this.setState({
            isLoggedIn: false
        });
    };

    handleLogIn = (formValues) => {
        const { loginUser } = this.props;

        loginUser(formValues);
    };

    render() {
        const { isLoggedIn } = this.state;

        if(isLoggedIn){
            return (
                <div className="ui container">
                    <Header isLoggedIn={isLoggedIn} handleLogOut={this.handleLogOut}/>
                    <UsersList/>
                </div>
            );
        }

        return (
            <div className="ui container">
                <Header isLoggedIn={isLoggedIn}/>
                <LogIn handleLogIn={this.handleLogIn} isLoggedIn={isLoggedIn}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(
    mapStateToProps,
    { loginUser }
)(App);