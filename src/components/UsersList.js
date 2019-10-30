import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchGroups } from '../actions';

class UsersList extends Component {
    componentDidMount() {
        const { fetchUsers, fetchGroups } = this.props;

        fetchUsers();
        fetchGroups();
    }

    render() {
        console.log(this.props);

        return (
            <div>
                <h1>Users List</h1>

            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(
    mapStateToProps,
    { fetchUsers, fetchGroups }
)(UsersList);