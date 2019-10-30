import React, { Component } from 'react';

class Header extends Component {
    onLogOut = () => {
        const { handleLogOut } = this.props;

        handleLogOut();
    };

    renderLogOut(){
        const { isLoggedIn } = this.props;

        if(isLoggedIn){
            return (
                <a to="#" className="item" onClick={this.onLogOut}>
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