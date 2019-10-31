import React from 'react';
import { Field, reduxForm } from 'redux-form';
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

    renderInput = ({ input, label, meta, placeholder }) => {
        const { error, touched } = meta;

        const className = `field ${error && touched ? '' : ''}`;
        return (
            <div className={className}>
                <label>
                    {label}
                </label>
                <input data-testid={input.name} placeholder={placeholder} {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = (formValues) => {
        const { onSubmit } = this.props;

        onSubmit(formValues);
    };

    render() {
        const { handleSubmit } = this.props;
        const { log_in_form: { submit_button } } = test_ids;

        return (
            <form onSubmit={handleSubmit(this.onSubmit)} className="ui form error">
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
                <button data-testid={submit_button} className="ui button">
                    Log In
                </button>
            </form>
        );
    }
}

const validate = ({ name, password }) => {
    const errors = {};

    if(!name){
        errors.name = "Please enter Full Name";
    }

    if(!password){
        errors.password = "Please enter Password";
    }

    return errors;
};

export default reduxForm({
    form: 'usersForm',
    validate
})(Form);
