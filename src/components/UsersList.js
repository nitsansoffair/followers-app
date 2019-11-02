import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, updateUser } from '../actions/userActions';
import { fetchGroups } from '../actions/groupActions';
import { LOGGED_IN } from '../constants';
import data from '../data/data';
import test_ids from '../test/test_ids';

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
        const { followers } = user;

        if(follow){
            const transformedUser = {
                ...user,
                followers: [
                    ...followers,
                    id
                ]
            };

            updateUser(transformedUser);

        } else {
            const transformedUser = {
                ...user,
                followers: followers.filter((followerId) => followerId !== id)
            };

            updateUser(transformedUser);
        }
    };

    renderFollowButton(user, follow){
        const { users: { loggedInUser } } = this.props;
        const { users_list_page: { follow_button_text, following_button_text, unfollow_button_text } } = data;

        const extraClass = follow ? follow_button_text : following_button_text;
        const display = loggedInUser && loggedInUser.id !== user.id;

        if(display){
            const buttonText = follow ? follow_button_text : following_button_text;

            return (
                <div className="content name">
                    <button
                        className={`ui button ${extraClass}`}
                        onClick={() => this.toggleFollow(user, follow)}
                        data-hover={unfollow_button_text}
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
        const { users_list_page: { welcome_message } } = data;

        if(loggedInUser){
            const { name } = loggedInUser;

            return (
                <h3>
                    {welcome_message} {name}
                </h3>
            );
        }

        return null;
    }

    render() {
        const { users_list_page: { choose_users_to_follow_message, name_title, group_title, followers_title } } = data;
        const { users_list_page } = test_ids;

        return (
            <div className="ui celled list" data-testid={users_list_page}>
                {this.renderHello()}
                <h2>{choose_users_to_follow_message}</h2>
                <div className="item title">
                    <div className="content name">
                        {name_title}
                    </div>
                    <div className="content">
                        {group_title}
                    </div>
                    <div className="content">
                        {followers_title}
                    </div>
                    <div className="content name"/>
                </div>
                {this.renderList()}
            </div>
        );
    }
}

const sortUsers = (user1, user2) => {
    if(user1.name < user2.name){
        return -1;
    } else if (user1.name > user2.name){
        return 1;
    }

    return 0;
};

const mapStateToProps = (state) => {
    const { users } = state;
    const { usersList } = users;

    if(usersList){
        const loggedInId = localStorage.getItem(LOGGED_IN);
        const loggedInUser = usersList.find(({ id }) => id.toString() === loggedInId);

        const transformedUsers = {
            ...users,
            usersList: usersList.sort(sortUsers),
            loggedInUser,
        };

        return {
            ...state,
            users: transformedUsers
        };
    }

    return state;
};

export default connect(
    mapStateToProps,
    { fetchUsers, fetchGroups, updateUser }
)(UsersList);