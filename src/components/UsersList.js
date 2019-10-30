import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../actions';
import { fetchUsers, fetchGroups } from '../actions';
import { LOGGED_IN } from '../constants';

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
        // TODO - Unfollow on following hover

        const { users: { loggedInUser } } = this.props;

        const extraClass = follow ? 'follow' : 'following';
        const display = loggedInUser && loggedInUser.id !== user.id;

        if(display){
            return (
                <div className="content name">
                    <button className={`ui button ${extraClass}`} onClick={() => this.toggleFollow(user, follow)}>
                        {follow ? 'Follow' : 'Following'}
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
        return (
            <div className="ui celled list">
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

    if(users && users.usersList){
        const { usersList } = users;

        const loggedInId = localStorage.getItem(LOGGED_IN);
        const loggedInUser = usersList.find(({ id }) => id.toString() === loggedInId);

        const transformedUsers = {
            ...users,
            loggedInUser
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