
import Axios from 'axios';
import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/home.component';
import Login from './components/login.component';
import Navigation from './components/nav.component';
import AdmUsuarios from './usuarios/pages/adm-usuarios.component';
import SaveUsuario from './usuarios/pages/save-usuario.component';
import AdmProductos from './productos/adm-productos.component';
import SaveProducto from './productos/save-productos.component';
import EditProducto from './productos/edit-productos.component';

export default class App extends Component {


  state = {};

  componentDidMount = () => {

    Axios.get('Usuario/' + localStorage.getItem('id')).then(
      res => {
        this.setUser(res.data)
      },
      err => {
        console.log(err);
      }
    )
  }

  setUser = user => {
    this.setState({
      user: user
    })
  }

  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <Navigation user={this.state.user} setUser={this.setUser} />
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route exact path="/" component={() => <Home user={this.state.user} />} />
                <Route exact path="/login" component={() => <Login setUser={this.setUser} />} />
                <Route exact path="/register" component={SaveUsuario} />
                <Route exact path="/adm-usuarios" component={AdmUsuarios} />
                <Route exact path="/adm-productos" component={AdmProductos} />
                <Route exact path="/adm-productos/registrar" component={SaveProducto} />
                <Route exact path="/adm-productos/editar" component={(props) =><EditProducto {...props} />} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter >
    );

  }
}
