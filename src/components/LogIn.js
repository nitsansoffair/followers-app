import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions';
import Form from './Form';

class LogIn extends Component {
    state = {};

    onSubmit = (formValues) => {
        const { loginUser } = this.props;

        loginUser(formValues);

        this.setState({
            formSubmitted: true
        });
    };

    renderErrorMessage(){
        const { users: { loggedIn } } = this.props;
        const { formSubmitted } = this.state;

        if(!loggedIn && formSubmitted){
            return (
                <div className="error">
                    <p>
                        Credentials is not valid
                    </p>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h3>
                    Must be signed in
                </h3>
                <h1>Log In</h1>
                <Form onSubmit={this.onSubmit} submit_text="Log In"/>
                {this.renderErrorMessage()}
            </div>
        );
    }
}

const mapStateToProps = ({ users }) => {
    return {
        users
    };
};

export default connect(
    mapStateToProps,
    { loginUser }
)(LogIn);