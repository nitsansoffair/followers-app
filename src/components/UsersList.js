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
        if(prevProps !== this.props){
            this.props.fetchUsers();
        }
    }

    renderGroupName(groupId){
        if(this.props.groups && this.props.groups.groupsList){
            const { groups: { groupsList } } = this.props;

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

        const extraClass = follow ? data.users_list_page.follow_button_text : data.users_list_page.following_button_text;
        const display = loggedInUser && loggedInUser.id !== user.id;

        if(display){
            const buttonText = follow ? data.users_list_page.follow_button_text : data.users_list_page.following_button_text;

            return (
                <div className="content name">
                    <button
                        className={`ui button ${extraClass}`}
                        onClick={() => this.toggleFollow(user, follow)}
                        data-hover={data.users_list_page.unfollow_button_text}
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
        if(this.props.users && this.props.users.usersList){
            const { users: { usersList, loggedInUser } } = this.props;

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
        if(this.props.users.loggedInUser){
            const { users: { loggedInUser: { name } } } = this.props;

            return (
                <h3>
                    {data.users_list_page.welcome_message} {name}
                </h3>
            );
        }

        return null;
    }

    render() {
        return (
            <div className="ui celled list" data-testid={test_ids.users_list_page}>
                {this.renderHello()}
                <h2>{data.users_list_page.choose_users_to_follow_message}</h2>
                <div className="item title">
                    <div className="content name">
                        {data.users_list_page.name_title}
                    </div>
                    <div className="content">
                        {data.users_list_page.group_title}
                    </div>
                    <div className="content">
                        {data.users_list_page.followers_title}
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
    const { users: { usersList } } = state;

    if(usersList){
        const loggedInId = localStorage.getItem(LOGGED_IN);
        const loggedInUser = usersList.find(({ id }) => id.toString() === loggedInId);

        const transformedUsers = {
            ...state.users,
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