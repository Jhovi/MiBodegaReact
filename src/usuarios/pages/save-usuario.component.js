import Axios from "axios";
import { Component } from "react";
import React, { useState } from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Redirect } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../../App.css';

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

    state = {
        fecha: ''
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
                    this.setState({ goBackToAdmUsuario: true })
                }
            ).catch(
                err => {
                    console.log(err)
                }
            )
        }


    }

    render() {

        if (this.state.goBackToAdmUsuario) {
            return <Redirect to={'/adm-usuarios'} />
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Registrar Usuario</h3>

                <label>Seleccione su genero: </label>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="0" onChange={this.handleGenero} />
                    <label className="form-check-label" for="exampleRadios1">
                        Masculino
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="1" onChange={this.handleGenero} />
                    <label className="form-check-label" for="exampleRadios2">
                        Femenino
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="2" onChange={this.handleGenero} />
                    <label className="form-check-label" for="exampleRadios2">
                        Desconocido
                    </label>
                </div>

                <br />

                <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" className="form-control" placeholder="Nombre"
                        onChange={e => this.nombre = e.target.value} />
                </div>

                <div className="form-group">
                    <label>Apellido</label>
                    <input type="text" className="form-control" placeholder="Apellido"
                        onChange={e => this.apellido = e.target.value} />
                </div>

                <div className="form-group">
                    <label>Correo</label>
                    <input type="email" className="form-control" placeholder="Correo"
                        onChange={e => this.correo = e.target.value} />
                </div>

                <div className="form-group">
                    <label>Fecha de Nacimiento</label>
                    <br></br>
                    <Datepicker className="form-control"  selected={this.state.fecha} onChange={this.onChange} dateFormat='dd/MM/yyyy'
                        maxDate={new Date("2002", "01", "01")} showYearDropdown scrollableMonthYearDropdown />
                </div>

                <div className="form-group">
                    <label>Telefono</label>
                    <input type="number" className="form-control" placeholder="Telefono"
                        onChange={e => this.telefono = e.target.value} />
                </div>

                <div className="form-group">
                    <label>DNI</label>
                    <input type="number" className="form-control" placeholder="Dni"
                        onChange={e => this.dni = e.target.value} />
                </div>

                <div className="form-group">
                    <label>Contraseña</label>
                    <input type="password" className="form-control" placeholder="Contraseña"
                        onChange={e => this.password = e.target.value} />
                </div>

                <div className="form-group">
                    <label>Confirmar Contraseña</label>
                    <input type="password" className="form-control" placeholder="Confirmar contraseña"
                        onChange={e => this.confirmPassword = e.target.value} />
                </div>

                <button className="btn btn-primary btn-block">Registrar</button>
            </form>
        )
    }
}