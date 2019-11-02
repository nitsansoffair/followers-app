import React from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from '../reducers';
import { cleanup, render, fireEvent, waitForElement } from '@testing-library/react';
import api from '../apis/api';
import App from '../components/App';
import test_ids from './test_ids';

describe('Create App', () => {
    let component;

    afterEach(cleanup);

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        reducers,
        composeEnhancers(applyMiddleware(reduxThunk))
    );

    beforeEach(() => {
        component = render(
            <Provider store={store}>
                <App/>
            </Provider>
        );
    });

    const logIn = () => {
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
    };

    test('Should not display users list', () => {
        const { queryByTestId } = component;
        const { users_list_page } = test_ids;

        const usersPage = queryByTestId(users_list_page);

        expect(usersPage).toBeNull();
    });

    test('Should log in and log out successfully', async() => {
        const { queryByTestId } = component;
        const { log_in_form: { submit_button }, users_list_page, log_out_link } = test_ids;

        logIn();

        const usersPage = await waitForElement(() => queryByTestId(users_list_page));
        expect(usersPage).toBeDefined();

        const logOutLink = await waitForElement(() => queryByTestId(log_out_link));

        fireEvent.click(logOutLink);
        const submitLogInForm = await waitForElement(() => queryByTestId(submit_button));

        expect(submitLogInForm).toBeDefined();
    });

    test('Should fetch users', async() => {
        const { status } = await api.get('/users');

        expect(status).toBe(200);
    });

    test('Should fetch groups', async() => {
        const { status } = await api.get('/groups');

        expect(status).toBe(200);
    });

    test('Should update user followers', async() => {
        const loggedInUser =   {
            id: 0,
            name: 'Nitsan',
            password: '0',
            group_id: 0,
            followers: []
        };

        const followers = [0, 1, 2];
        const transformedUser = {
            ...loggedInUser,
            followers
        };

        try {
            const { status } = await api.put(`/users/${transformedUser.id}`, {
                ...transformedUser
            });

            expect(status).toBe(200);
        } catch (e) {
            console.log(e);
        }
    })
});