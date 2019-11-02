import React from 'react';
import { Field, reduxForm } from 'redux-form';
import data from '../data/data';
import test_ids from '../test/test_ids';

class Form extends React.Component {
    renderError({ touched, error }) {
        if(touched && error){
            return (
                <div className="error">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta, placeholder, type }) => {
        return (
            <div className='field'>
                <label>
                    {label}
                </label>
                <input data-testid={input.name} placeholder={placeholder} {...input} autoComplete="off" type={type}/>
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = (formValues) => this.props.onSubmit(formValues);

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field
                    name="name"
                    type="text"
                    component={this.renderInput}
                    placeholder="Enter Full name"
                    label="Full Name"
                />
                <Field
                    name="password"
                    type="password"
                    component={this.renderInput}
                    placeholder="Enter password"
                    label="Password"
                />
                <button data-testid={test_ids.log_in_form.submit_button} className="ui button">
                    Log In
                </button>
            </form>
        );
    }
}

const validate = ({ name, password }) => {
    const errors = {};

    if(!name){
        errors.name = data.error_name;
    }

    if(!password){
        errors.password = data.error_password;
    }

    return errors;
};

export default reduxForm({
    form: 'usersForm',
    validate
})(Form);
