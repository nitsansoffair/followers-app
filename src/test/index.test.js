import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { createStore } from 'redux';
import reducers from '../reducers';
import { Provider } from 'react-redux';
import App from '../components/App';
import test_ids from './test_ids';
import { LOGGED_IN } from '../constants';

describe('Create App', () => {
    var component;

    afterEach(cleanup);

    const store = createStore(
        reducers
    );

    beforeEach(() => {
        component = render(
            <Provider store={store}>
                <App/>
            </Provider>
        );
    });

    test('Should not display users list', () => {
        const { queryByTestId } = component;
        const { users_list_page } = test_ids;

        const usersPage = queryByTestId(users_list_page);

        expect(usersPage).toBeNull();
    });

    test('Should display users list if local storage key is set', () => {
        const { queryByTestId } = component;
        const { users_list_page } = test_ids;

        localStorage.setItem(LOGGED_IN, {
            id: 0,
            name: 'Nitsan',
            password: '0',
            group_id: 0,
            followers: [
                2
            ]
        });

        const usersPage = queryByTestId(users_list_page);

        expect(usersPage).toBeDefined();
    });

    // TODO - Finish this test
    test('Should log in successfully', async() => {
        const { queryByTestId } = component;
        const { log_in_form: { name_input, password_input, submit_button } } = test_ids;

        const nameInput = queryByTestId(name_input);
        const passwordInput = queryByTestId(password_input);
        const submitButton = queryByTestId(submit_button);

        fireEvent.change(nameInput, {
            target: {
                value: 'Nitsan'
            }
        });

        fireEvent.change(passwordInput, {
            target: {
                value: '0'
            }
        });

        fireEvent.click(submitButton);
    });
});