import Axios from "axios";
import { Component } from "react";
import React from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Redirect } from "react-router-dom";
import '../../App.css';
import Notifications, { notify } from '../../components/Notification';

const finalSpaceCharacters = [
    {
        id: 'a',
        value: 0,
        thumb: '/images/avatar_femenino.png'
    },
    {
        id: 'b',
        value: 1,
        thumb: '/images/avatar_hombre.jpg'
    },
    {
        id: 'c',
        value: 2,
        thumb: '/images/avatar_desconocido.jpg'
    }
]


export default class SaveUsuario extends Component {

    
    defaultValue = new Date(this.props.location.state.user.fechaNacimiento);

    state = {
        fecha: ''
    }

    constructor(props) {
        super(props)
    }

    onChange = fecha => {
        this.setState({ fecha: fecha });
    }

    handleGenero = event => {
        this.setState({ genero: event.target.value })
    }
    handleSubmit = e => {
        e.preventDefault();
        let data = {}

        if (this.props.location.state.user.id) {
            var userNoEdit = {
                id: this.props.location.state.user.id,
                nombre: this.props.location.state.user.nombre,
                apellido: this.props.location.state.user.apellido,
                fechaNacimiento: this.props.location.state.user.fechaNacimiento.toString(),
                correo: this.props.location.state.user.correo,
                telefono: this.props.location.state.user.telefono,
                dni: this.props.location.state.user.dni,
                genero: this.props.location.state.user.genero
            }

            data = {
                id: this.props.location.state.user.id,
                nombre: this.nombre,
                apellido: this.apellido,
                correo: this.correo,
                dni: this.dni,
                telefono: this.telefono,
                fechaNacimiento: this.state.fecha,
                genero: this.state.genero
            }


            if (data.nombre == null)
                data.nombre = userNoEdit.nombre
            if (data.apellido == null)
                data.apellido = userNoEdit.apellido
            if (data.correo == null)
                data.correo = userNoEdit.correo
            if (data.dni == null)
                data.dni = userNoEdit.dni
            if (data.telefono == null)
                data.telefono = userNoEdit.telefono
            if (data.fechaNacimiento == '')
                data.fechaNacimiento = userNoEdit.fechaNacimiento
            if (data.genero == null)
                data.genero = userNoEdit.genero

            Axios.put('Usuario', data).then(
                res => {
                    this.setState({
                        goBackToAdmUsuario: true,
                        process: 'edit'
                    })
                }
            ).catch(
                err => {
                    console.log(err)
                }
            )


        } else {
            if (this.password === this.confirmPassword) {
                data = {
                    nombre: this.nombre,
                    apellido: this.apellido,
                    correo: this.correo,
                    dni: this.dni,
                    telefono: this.telefono,
                    password: this.password,
                    fechaNacimiento: this.state.fecha,
                    genero: +this.state.genero
                }
                
                Axios.post('Usuario/register', data).then(
                    res => {
                        this.setState({
                            goBackToAdmUsuario: true,
                            process: 'created'
                        })
                    }
                ).catch(
                    err => {
                        console.log(err)
                    }
                )
            }
        }




    }

    render() {

        if (this.state.goBackToAdmUsuario) {
            return (
                <div>
                    <Redirect to={{
                        pathname: '/adm-usuarios',
                        state: { showModal: true, process: this.state.process }
                    }} />
                </div>
            )

        }

        let passwordField;
        if (this.props.location.state.user.id) {
            passwordField = (
                <div></div>
            )
        } else {
            passwordField = (
                <div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input type="password" className="form-control" placeholder="Contraseña" id="password"
                            onChange={e => this.password = e.target.value} />
                    </div>

                    <div className="form-group">
                        <label>Confirmar Contraseña</label>
                        <input type="password" className="form-control" placeholder="Confirmar contraseña" id="confirm-password"
                            onChange={e => this.confirmPassword = e.target.value} />
                    </div>
                </div>
            )
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Registrar Usuario</h3>

                <label>Seleccione su genero: </label>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="exampleRadios" defaultChecked={this.props.location.state.user?.genero == 0 ? true : false} id="exampleRadios1" value="0" onChange={this.handleGenero} />
                    <label className="form-check-label" for="exampleRadios1">
                        Masculino
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="exampleRadios" defaultChecked={this.props.location.state.user?.genero == 1 ? true : false} id="exampleRadios2" value="1" onChange={this.handleGenero} />
                    <label className="form-check-label" for="exampleRadios2">
                        Femenino
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="exampleRadios" defaultChecked={this.props.location.state.user?.genero == 2 ? true : false} id="exampleRadios3" value="2" onChange={this.handleGenero} />
                    <label className="form-check-label" for="exampleRadios2">
                        Desconocido
                    </label>
                </div>

                <br />

                <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" className="form-control" placeholder="Nombre" id="nombre" defaultValue={this.props.location.state.user?.nombre}
                        onChange={e => this.nombre = e.target.value} />
                </div>

                <div className="form-group">
                    <label>Apellido</label>
                    <input type="text" className="form-control" placeholder="Apellido" id="apellido" defaultValue={this.props.location.state.user?.apellido}
                        onChange={e => this.apellido = e.target.value} />
                </div>

                <div className="form-group">
                    <label>Correo</label>
                    <input type="email" className="form-control" placeholder="Correo" id="correo" defaultValue={this.props.location.state.user?.correo}
                        onChange={e => this.correo = e.target.value} />
                </div>

                <div className="form-group">
                    <label>Telefono</label>
                    <input type="number" className="form-control" placeholder="Telefono" id="telefono" defaultValue={this.props.location.state.user?.telefono}
                        onChange={e => this.telefono = e.target.value} />
                </div>

                <div className="form-group">
                    <label>DNI</label>
                    <input type="number" className="form-control" placeholder="Dni" id="dni" defaultValue={this.props.location.state.user?.dni}
                        onChange={e => this.dni = e.target.value} />
                </div>

                <div className="form-group">
                    <label>Fecha de Nacimiento</label>
                    <br></br>
                    <Datepicker className="form-control" selected={this.state.fecha == '' ? this.defaultValue : this.state.fecha} onChange={this.onChange} dateFormat='dd/MM/yyyy'
                       id="fechaNacimiento" maxDate={new Date("2002", "01", "01")} showYearDropdown scrollableMonthYearDropdown />
                </div>

                {passwordField}

                <button id="btn-save" className="btn btn-primary btn-block">Registrar</button>
            </form>
        )
    }
}