import Axios from "axios";
import { Component } from "react";
import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Redirect } from "react-router-dom";
import '../App.css';
import Datepicker from 'react-datepicker';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';


const saveproductos = []
const subtotales = []
export default class SaveBoleta extends Component {

    state = {
        abierto: false,
        fecha: '',
           
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
    }

    setUsers = users => {
        this.setState({
            users: users
        })
    }

    setproducts = products =>{
        this.setState({
            products: products
           })
    }



    handleSubmit = e => {
        e.preventDefault();
        let data = {}

        data = {
          

        }


        Axios.post('Boleta', data).then(
            res => {
                this.setState({ goBackToAdmProducto: true })
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
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
    agregarcantidad(cantidad) {                       
        subtotales.push(cantidad)
        console.log(subtotales)        
    }   


    render() {
        console.log(this.state.selectedusuario)
        const modalStyles = {

            position: "absolute",
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)'
        }

       

        if (this.state.goBackToAdmProducto) {
            return <Redirect to={'/adm-productos'} />
        }

        return (
            <>
            
                <form onSubmit={this.handleSubmit}>
                    <h3>Registrar Boleta</h3>

                    <div className="form-group">
                        <label>seleccionar usuario</label>
                        <input type="text" className="form-control" placeholder="Nombre" value = {(this.state.selectedusuario== undefined)? "":this.state.selectedusuario.nombre +" "+ this.state.selectedusuario.apellido}
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
                                <tr key={index} onClick={()=>this.escogerUsuario(user)}>
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
                    <input type="text" className="form-control" placeholder="Direccion" 
                        onChange={e => this.direccion = e.target.value} />
                </div>               

                <form>
                <h3>Detalles de los producto</h3>
                <button type="button"  onClick={this.abrirModalP}  className="btn btn-primary  btn-register-user">Agregar nuevo producto</button>

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
                                     <td><input type="number" className="form-control" onChange={e => this.agregarcantidad(e.target.value)} placeholder="Cantidad"/></td>
                                     <td>{product.precio}</td>                                     
                                     <td></td>                                                                                                                           
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </form>

                <div className="form-group">
                    <label>total</label>
                    <input type="number" className="form-control" placeholder="Precio" disabled = "true"                   />
                </div>

                <button className="btn btn-primary btn-block" >Registrar</button>
            </form>
            </>
        )
    }
}