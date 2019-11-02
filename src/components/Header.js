import React, { Component } from 'react';
import data from '../data/data';
import test_ids from '../test/test_ids';

class Header extends Component {
    onLogOut = () => this.props.handleLogOut();

    renderLogOut(){
        if(this.props.isLoggedIn){
            return (
                <a data-testid={test_ids.log_out_link} to="#" className="item" onClick={this.onLogOut}>
                    {data.log_out_text}
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