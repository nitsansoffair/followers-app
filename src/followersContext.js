import React from 'react';

const Context = React.createContext('');

export class FollowersStore extends React.Component {

    state = {};

    constructor(props) {
        super(props);

    }

    render() {
        const { children } = this.props;

        return (
            <Context.Provider
                value={{
                    ...this.state
                }}
            >
                {children}
            </Context.Provider>
        );
    }
}

export default Context;