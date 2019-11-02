import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import data from '../data/data';

class LogIn extends Component {
    state = {};

    onSubmit = (formValues) => this.props.handleLogIn(formValues);

    renderErrorMessage(){
        if(this.props.invalidCredentials){
            return (
                <div className="error">
                    <p>
                        {data.credentials_is_not_valid_error}
                    </p>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h3>
                    {data.must_be_signed_in_message}
                </h3>
                <h1>{data.log_in_title}</h1>
                <Form onSubmit={this.onSubmit} submit_text={data.log_in_button_text}/>
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