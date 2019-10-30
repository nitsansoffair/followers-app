import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        const loggedIn = !!localStorage.getItem(LOGGED_IN);

        this.setState({
            loggedIn
        });
    }

    handleLogOut = () => {
        localStorage.removeItem(LOGGED_IN);

        this.setState({
            loggedIn: false
        });
    };

    render() {
        const { loggedIn } = this.state;

        if(loggedIn){
            return (
                <div className="ui container">
                    <Header loggedIn={loggedIn} handleLogOut={this.handleLogOut}/>
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