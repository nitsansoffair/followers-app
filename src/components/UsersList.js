import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchGroups } from '../actions';

class UsersList extends Component {
    componentDidMount() {
        const { fetchUsers, fetchGroups } = this.props;

        fetchUsers();
        fetchGroups();
    }

    renderGroupName(groupId){
        const { groups } = this.props;

        if(groups && groups.groupsList){
            const { groupsList } = groups;

            const userGroup = groupsList.find(({ id }) => id === groupId);
            if(userGroup){
                return (
                    <div className="content">
                        {userGroup.name}
                    </div>
                );
            }
        }

        return null;
    };

    renderList(){
        const { users } = this.props;

        if(users && users.usersList){
            const { usersList } = users;

            return usersList.map(({ name, group_id, follows }, key) => {
                return (
                    <div className="item" key={key}>
                        <i className="fas fa-user"/>
                        <div className="content">
                            {name}
                        </div>
                        <div className="content">
                            {follows.length}
                        </div>
                        {this.renderGroupName(group_id)}
                        <button className="ui button">
                            Follow
                        </button>
                    </div>
                );
            });
        }

        return null;
    }

    render() {
        return (
            <div>
                <h1>Users List</h1>
                {this.renderList()}
            </div>
        );
    }
}

const mapStateToProps = (state) => state;

export default connect(
    mapStateToProps,
    { fetchUsers, fetchGroups }
)(UsersList);