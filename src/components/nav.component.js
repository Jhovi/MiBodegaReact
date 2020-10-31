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
            buttons = (
                <div>
                    <ul className="navbar-nav ml-2">

                        <li className="nav-item">
                            <Link to={'/adm-usuarios'} className="nav-link">Usuarios</Link>
                        </li>

                        <li className="nav-item">
                            <Link to={'/adm-boletas'} className="nav-link">Boleta</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/adm-productos'} className="nav-link">Productos</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/adm-metrics'} className="nav-link">Estadisticas</Link>
                        </li>

                        <li className="nav-item-logout">
                            <Link to={'/'} onClick={this.handleLogout} className="nav-link">Logout</Link>
                        </li>


                    </ul>

                </div>
            )
        } else {
            buttons = (<div></div>

            )
        }
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
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