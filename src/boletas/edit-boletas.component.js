import Axios from "axios";
import { Component } from "react";
import React, { useState } from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Redirect } from "react-router-dom";
import '../App.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import Moment from 'moment';

export default class EditBoleta extends Component {

    state = {
        fecha: new Date()
    }    

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onChange = fecha => {
        this.setState({ fecha: fecha });
    }

    componentDidMount = () => {

        Axios.get('Usuario').then(
            res => {
                this.setUsers(res.data)
            },
            err => {
                console.log(err);
            }
        )
        Moment.locale('en');
        var dt = this.props.location.state.boleta.fecha;
        var data = Moment(dt).format('DD/MM/YYYY')
        console.log(data)
        var d = new Date(data)
        this.setState({
            fecha: d
        }) 
        console.log(d) 
    }

    setUsers = users => {
        this.setState({
            users: users
        })
    }

    escogerUsuario(usuario) {
        this.userdetected = usuario
        this.setState({            
            selectedusuario: usuario
        })        
        console.log(this.userdetected.nombre)
        
          
        this.abrirModal()
       
    }  

    

    handleSubmit = e => {
        e.preventDefault();
        let data = {}

        var nuevaboleta = {
            id: this.props.location.state.boleta.id,
            nombre: this.props.location.state.boleta.usuarioId,
            descripcion: this.props.location.state.boleta.fecha,
            precio: this.props.location.state.boleta.direccion,
            categoria: this.props.location.state.boleta.total,            
        }

        data = {
            id: this.props.location.state.boleta.id,
            usuarioId: this.usuarioId,
            fecha: this.fecha,
            direccion: this.direccion,
            total: this.total

        }
        if (data.id == null)
            data.id = nuevaboleta.id
        if (data.usuarioId == null)
            data.usuarioId = nuevaboleta.usuarioId
        if (data.fecha == null)
            data.fecha = nuevaboleta.fecha
        if (data.direccion == null)
            data.direccion = nuevaboleta.direccion        

        Axios.put('Boleta', data).then(
            res => {
                this.setState({ goBackToAdmBoleta: true })
            }
        ).catch(
            err => {
                console.log(err)
            }
        )



    }

    onTodoChange(value) {
        this.setState({
            name: value
        });
    }

    abrirModal = () => {
        this.setState({ abierto: !this.state.abierto })
    }

    render() {

              
        const modalStyles = {

            position: "absolute",
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)'
        }
       


        if (this.state.goBackToAdmBoleta) {
            return <Redirect to={'/adm-boletas'} />
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Editar Boleta</h3>

                <div className="form-group">
                    <label>Seleccionar usuario</label>
                    <input type="text" className="form-control" placeholder="Nombre"
                        onClick={this.abrirModal} />
                </div>

            <Modal isOpen={this.state.abierto} style={modalStyles}>
                    <ModalHeader>
                        Seleccionar usuario
            </ModalHeader>

                    <ModalBody>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Codigo Cliente</th>
                                    <th scope="col">Nombres</th>
                                    <th scope="col">Correo</th>
                                    <th scope="col">Telefono</th>
                                </tr>
                            </thead>
                            <tbody >

                                {this.state.users && this.state.users.map((user, index) => {
                                    return (
                                        <tr key={index} onClick={() => this.escogerUsuario(user)}>
                                            <td>{user.id}</td>
                                            <td>{user.nombre} {user.apellido}</td>
                                            <td>{user.correo}</td>
                                            <td>{user.telefono}</td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                    </ModalBody>

                    <ModalFooter>
                        <Button color="secondary" onClick={this.abrirModal}>Cerrar</Button>
                    </ModalFooter>

                </Modal>


                <div className="form-group">
                    <label>Fecha</label>
                    <br></br>
                    <Datepicker className="form-control" onChange={this.onChange} dateFormat='dd/MM/yyyy' selected = {this.state.fecha}
                        maxDate={new Date("2021", "01", "01")} showYearDropdown scrollableMonthYearDropdown />
                </div>

                <div className="form-group">
                    <label>Direccion</label>
                    <input type="text" className="form-control" placeholder="Direccion" defaultValue = {this.props.location.state.boleta.direccion}
                        onChange={e => this.direccion = e.target.value} />
                </div>               

                <form>
                <h3>Detalles de los producto</h3>
                <button type="button"  onClick={this.abrirModal}  className="btn btn-primary  btn-register-user">Agregar nuevo producto</button>

                <Modal isOpen={this.state.abierto} style={modalStyles}>
                    <ModalHeader>
                        Seleccionar usuario
            </ModalHeader>

                    <ModalBody>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Codigo Cliente</th>
                                    <th scope="col">Nombres</th>
                                    <th scope="col">Correo</th>
                                    <th scope="col">Telefono</th>
                                </tr>
                            </thead>
                            <tbody >

                                {this.state.users && this.state.users.map((user, index) => {
                                    return (
                                        <tr key={index} onClick={() => this.escogerUsuario(user)}>
                                            <td>{user.id}</td>
                                            <td>{user.nombre} {user.apellido}</td>
                                            <td>{user.correo}</td>
                                            <td>{user.telefono}</td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                    </ModalBody>

                    <ModalFooter>
                        <Button color="secondary" onClick={this.abrirModal}>Cerrar</Button>
                    </ModalFooter>

                </Modal>


                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Producto</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">SubTotal</th>                              
                        </tr>
                    </thead>                   
                    <tbody>
                        {this.state.bills && this.state.bills.map((bill, index) => {
                            return (
                                
                                <tr key={index}>                                   
                                    <td>test</td>                               
                                    <td>test</td>                                    
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </form>

                <div className="form-group">
                    <label>total</label>
                    <input type="number" className="form-control" placeholder="Precio" disabled = "true"  defaultValue = {this.props.location.state.boleta.total}                 />
                </div>

                <button className="btn btn-primary btn-block" >Registrar</button>
            </form>
        )
    }
}