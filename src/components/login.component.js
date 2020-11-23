
import Axios from "axios";
import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Notifications, { notify } from '../components/Notification';
import logo from '../logo.png';


export default class Login extends Component {


    state = {
        loggedIn: false,
        emptyUser: {
            nombre: '',
            apellido: '',
            correo: '',
            dni: 0,
            telefono: 0,
            password: '',
            fechaNacimiento: new Date("2002", "01", "01"),
            genero: null
        },
    }

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            correo: this.correo,
            password: this.password
        }

        Axios.post('Usuario/authenticate', data).then(
            res => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('id', res.data.id)
                this.setState({
                    loggedIn: true
                });
                this.props.setUser(res.data.nombre)
            }
        ).catch(
            err => {
                notify('a')
                console.log(err)
            }
        )
    }

    saveUsuarioView = () => {
        this.setState({
            redirectToSaveUsuario: true
        })

    }


    render() {

        if (this.state.loggedIn) {
            return <Redirect to={'/adm-usuarios'} />;
        }

        if (this.state.redirectToSaveUsuario) {
            return <Redirect to={{
                pathname: '/register/0',
                state: { user: this.state.emptyUser }
            }} />;
        }

        return (
            <div className="login-card">

                <Notifications />

                <form onSubmit={this.handleSubmit}>
                    
                    <div className="img-container">
                        <img src={logo} className="img-logo" width="200" height="200" />
                    </div>

                    <div className="form-group">
                        <label>Correo</label>
                        <input type="text" className="form-control" placeholder="Correo" id="correo"
                            onChange={e => this.correo = e.target.value} />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input type="password" className="form-control" placeholder="Contraseña" id="password"
                            onChange={e => this.password = e.target.value} />
                    </div>

                    <button type="submit" id="btn-ingresar" className="btn btn-primary btn-block">Acceder</button>
                    <div className="col-md-12 ">
                        <div className="login-or">
                            <hr className="hr-or" />
                            <span className="span-or">or</span>
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary btn-block ">Invitado</button>
                    <div class="form-group">
                        <p class="text-center">Don't have account? <Link to={{
                            pathname: '/register/0',
                            state: { user: this.state.emptyUser }
                        }}>Sign up here</Link> </p>
                    </div>
                </form>
            </div>
        )
    }
}