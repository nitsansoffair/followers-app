import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../actions';
import { fetchUsers, fetchGroups } from '../actions';
import {LOGGED_IN} from "../constants";

class UsersList extends Component {
    componentDidMount() {
        const { fetchUsers, fetchGroups } = this.props;

        fetchUsers();
        fetchGroups();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { fetchUsers } = this.props;

        if(prevProps !== this.props){
            fetchUsers();
        }
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

    toggleFollow = (user, follow) => {
        const { updateUser, userLoggedIn: { id } } = this.props;
        var { followers } = user;

        if(follow){
            followers.push(id);
        } else {
            followers = followers.filter((followerId) => followerId !== id);
        }

        const transformedUser = {
            ...user,
            followers
        };

        updateUser(transformedUser);
    };

    renderFollowButton(user, follow){
        return (
            <button className="ui button" onClick={() => this.toggleFollow(user, follow)}>
                {follow ? 'Follow' : 'Following'}
            </button>
        );
    }

    renderList(){
        const { users, userLoggedIn } = this.props;

        if(users && users.usersList){
            const { usersList } = users;

            return usersList.map((user, key) => {
                const { name, group_id, followers } = user;

                const follow = followers.indexOf(userLoggedIn.id) === -1;

                return (
                    <div className="item" key={key}>
                        <i className="fas fa-user"/>
                        <div className="content">
                            {name}
                        </div>
                        <div className="content">
                            {followers.length}
                        </div>
                        {this.renderGroupName(group_id)}
                        {this.renderFollowButton(user, follow)}
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

const mapStateToProps = (state) => {
    const { users } = state;

    if(users && users.usersList){
        const { usersList } = users;

        const loggedInId = localStorage.getItem(LOGGED_IN);
        const userLoggedIn = usersList.find(({ id }) => id.toString() === loggedInId);

        return {
            ...state,
            userLoggedIn
        };
    }

    return state;
};

export default connect(
    mapStateToProps,
    { fetchUsers, fetchGroups, updateUser }
)(UsersList);