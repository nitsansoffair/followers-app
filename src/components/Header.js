import React, { Component } from 'react';

class Header extends Component {
    // TODO - Later as extra
    handleLogOut = () => {};

    renderLogOut(){
        const { loggedIn } = this.props;

        if(loggedIn){
            return (
                <a to="#" className="item" onClick={this.handleLogOut}>
                    Log Out
                </a>
            );
        }

        return null;
    }

    render() {
        return (
            <div className="ui secondary pointing menu">
                <div className="right menu">
                    {this.renderLogOut()}
                    <a to="#" className="item img-item">
                        <img src={require('../data/alpha.jpg')} alt=""/>
                    </a>
                </div>
            </div>
        );
    }
}

export default Header;