import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import data from '../data/data';

class LogIn extends Component {
    state = {};

    onSubmit = (formValues) => {
        const { handleLogIn } = this.props;

        handleLogIn(formValues);
    };

    renderErrorMessage(){
        const { invalidCredentials } = this.props;
        const { credentials_is_not_valid_error } = data;

        if(invalidCredentials){
            return (
                <div className="error">
                    <p>
                        {credentials_is_not_valid_error}
                    </p>
                </div>
            );
        }
    }

    render() {
        const { must_be_signed_in_message, log_in_title, log_in_button_text } = data;

        return (
            <div>
                <h3>
                    {must_be_signed_in_message}
                </h3>
                <h1>{log_in_title}</h1>
                <Form onSubmit={this.onSubmit} submit_text={log_in_button_text}/>
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
    {  }
)(LogIn);