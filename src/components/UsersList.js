import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../actions';
import { fetchUsers, fetchGroups } from '../actions';
import { LOGGED_IN } from '../constants';
import test_ids from '../test/test_ids';
import {dataKey} from "redux-form/lib/util/eventConsts";

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
        const { updateUser, users: { loggedInUser: { id } } } = this.props;
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
        const { users: { loggedInUser } } = this.props;

        const extraClass = follow ? 'follow' : 'following';
        const display = loggedInUser && loggedInUser.id !== user.id;

        if(display){
            const buttonText = follow ? 'Follow' : 'Following';

            return (
                <div className="content name">
                    <button
                        className={`ui button ${extraClass}`}
                        onClick={() => this.toggleFollow(user, follow)}
                        data-hover="Unfollow"
                    >
                        <span>
                            {buttonText}
                        </span>
                    </button>
                </div>
            );
        }

        return (
            <div className="content name">
                <button className={`ui button display-none`}/>
            </div>
        );
    }

    renderList(){
        const { users } = this.props;

        if(users && users.usersList){
            const { usersList, loggedInUser } = users;

            return usersList.map((user, key) => {
                const { name, group_id, followers } = user;

                const follow = loggedInUser && followers.indexOf(loggedInUser.id) === -1;

                return (
                    <div className="item" key={key}>
                        <i className="fas fa-user"/>
                        <div className="content name">
                            {name}
                        </div>
                        {this.renderGroupName(group_id)}
                        <div className="content">
                            {followers.length}
                        </div>
                        {this.renderFollowButton(user, follow)}
                    </div>
                );
            });
        }

        return null;
    }

    renderHello(){
        const { users: { loggedInUser } } = this.props;

        if(loggedInUser){
            const { name } = loggedInUser;

            return (
                <h3>
                    Welcome, {name}
                </h3>
            );
        }

        return null;
    }

    render() {
        const { users_list_page } = test_ids;

        return (
            <div className="ui celled list" data-testid={users_list_page}>
                {this.renderHello()}
                <h2>Choose Users to follow</h2>
                <div className="item title">
                    <i className="fas fa-user display-none"/>
                    <div className="content name">
                        Name
                    </div>
                    <div className="content">
                        Group Name
                    </div>
                    <div className="content">
                        # Followers
                    </div>
                    <div className="content name"/>
                </div>
                {this.renderList()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { users } = state;
    const { usersList } = users;

    var transformedUsers = users;

    if(usersList){
        const sortedUsers = usersList.sort((user1, user2) => {
            if(user1.name < user2.name){
                return -1;
            } else if (user1.name > user2.name){
                return 1;
            }

            return 0;
        });

        transformedUsers = {
            ...users,
            usersList: sortedUsers
        };
    }

    if(users && users.usersList){
        const { usersList } = users;

        const loggedInId = localStorage.getItem(LOGGED_IN);
        const loggedInUser = usersList.find(({ id }) => id.toString() === loggedInId);

        transformedUsers = {
            ...transformedUsers,
            loggedInUser,
        };
    }

    return {
        ...state,
        users: transformedUsers
    };
};

export default connect(
    mapStateToProps,
    { fetchUsers, fetchGroups, updateUser }
)(UsersList);