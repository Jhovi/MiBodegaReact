import { Component } from "react";
import { Link } from "react-router-dom";

export default class Navigation extends Component {

    handleLogout = () => {
        localStorage.clear();
        this.props.setUser(null);
    }

    render() {

        let buttons;
        if (this.props.user) {
            buttons = (<ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={'/'} onClick={this.handleLogout} className="nav-link">Logout</Link>
                </li>
            </ul>
            )
        } else {
            buttons = (<div></div>
                
            )
        }
        return (
            <nav className="nav navbar-expand navbar-light fixed-top">
                <div className="container">
                    <Link to={'/'} className="navbar-brand">Mi Bodega</Link>
                    <div className="collapse navbar-collapse">
                        {buttons}
                    </div>
                </div>
            </nav>
        )
    }
}