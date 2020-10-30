
import Axios from 'axios';
import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/home.component';
import Login from './components/login.component';
import Navigation from './components/nav.component';
import SaveUsuario from './usuarios/pages/save-usuario.component';

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
                <Route exact path="/" component={() => <Home user={this.state.user} /> } />
                <Route exact path="/login" component={() => <Login setUser={this.setUser} />} />
                <Route exact path="/register" component={SaveUsuario} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter >
    );

  }
}
