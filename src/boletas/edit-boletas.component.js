import Axios from "axios";
import { Component } from "react";
import React, { useState } from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Redirect } from "react-router-dom";
import '../App.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import Moment from 'moment';


const saveproductos = []
const subtotales = []
export default class EditBoleta extends Component {

    state = {
        fecha: new Date(),
        nombre: ''
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

        Axios.get('Producto').then(
            res => {
                this.setproducts(res.data)
            },
            err => {
                console.log(err);
            }
        )       

        Moment.locale('en');
        var dt = this.props.location.state.boleta.fecha;
        var data = Moment(dt).format('DD/MM/YYYY')       
        var d = new Date(data)
        this.setState({
            fecha: d
        })     
        
    }

    setUsers = users => {        
        var user
        for (var i = 0; i < users.length; i++) {
            if(users[i].id == this.props.location.state.boleta.usuarioId){
                user = users[i];   
                break;             
            }            
        }
        this.setState({
            users: users,
            nombre: user.nombre + " " + user.apellido
        })
    }

    
    setproducts = products =>{
        this.setState({
            products: products
           })
    }


    escogerUsuario(usuario) {
        this.setState({
            selectedusuario: usuario
        })
        this.abrirModalU()

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

    abrirModalU = () => {
        this.setState({ abiertoU: !this.state.abiertoU })
    }

    abrirModalP = () => {
        this.setState({ abiertoP: !this.state.abiertoP })
    }


    escogerUsuario(usuario) {
        this.setState({
            selectedusuario: usuario
        })
        this.abrirModalU()

    }

    escogerProducto(producto) {
        saveproductos.push(producto)
        console.log(saveproductos)
        this.abrirModalP()
    }
    agregarcantidad(cantidad, costo, index) {
        
        subtotales[index] = cantidad * costo
        console.log(subtotales[index])

    }

    render() {
        console.log(this.state.selectedusuario)
        console.log(this.state.users + "aaaa")
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
                    <label>seleccionar usuario</label>
                    <input type="text" className="form-control" placeholder="Nombre" value={(this.state.selectedusuario == undefined) ? this.state.nombre : this.state.selectedusuario.nombre + " " + this.state.selectedusuario.apellido}
                        onClick={this.abrirModalU} />
                </div>

                <Modal isOpen={this.state.abiertoU} style={modalStyles}>
                    <ModalHeader>
                        Seleccionar usuario
                    </ModalHeader>

                    <ModalBody>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Codigo</th>
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
                        <Button color="secondary" onClick={this.abrirModalU}>Cerrar</Button>
                    </ModalFooter>

                </Modal>


                <div className="form-group">
                    <label>Fecha</label>
                    <br></br>
                    <Datepicker className="form-control" onChange={this.onChange} dateFormat='dd/MM/yyyy' selected={this.state.fecha}
                        maxDate={new Date("2021", "01", "01")} showYearDropdown scrollableMonthYearDropdown />
                </div>

                <div className="form-group">
                    <label>Direccion</label>
                    <input type="text" className="form-control" placeholder="Direccion" defaultValue={this.props.location.state.boleta.direccion}
                        onChange={e => this.direccion = e.target.value} />
                </div>

                <form>
                    <h3>Detalles de los producto</h3>
                    <button type="button" onClick={this.abrirModalP} className="btn btn-primary  btn-register-user">Agregar nuevo producto</button>

                    <Modal isOpen={this.state.abiertoP} style={modalStyles}>
                        <ModalHeader>
                            Seleccionar Fecha
            </ModalHeader>

                        <ModalBody>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Codigo</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Categoria</th>
                                    </tr>
                                </thead>
                                <tbody >

                                    {this.state.products && this.state.products.map((product, index) => {
                                        return (
                                            <tr key={index} onClick={() => this.escogerProducto(product)}>
                                                <td>{product.id}</td>
                                                <td>{product.nombre}</td>
                                                <td>{product.precio}</td>
                                                <td>{product.categoria}</td>

                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                        </ModalBody>

                        <ModalFooter>
                            <Button color="secondary" onClick={this.abrirModalP}>Cerrar</Button>
                        </ModalFooter>

                    </Modal>


                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Producto</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Precio</th>
                                <th scope="col">SubTotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {saveproductos && saveproductos.map((product, index) => {
                                return (
                                    <tr key={index}>

                                        <td>{product.nombre}</td>
                                        <td><input type="number" className="form-control" onChange={e => this.agregarcantidad(e.target.value, product.precio, index)} placeholder="Cantidad" /></td>
                                        <td>{product.precio}</td>
                                        <td>{subtotales[index]}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </form>

                <div className="form-group">
                    <label>total</label>
                    <input type="number" className="form-control" placeholder="Precio" disabled="true" defaultValue={this.props.location.state.boleta.total} />
                </div>

                <button className="btn btn-primary btn-block" >Registrar</button>
            </form>
        )
    }
}