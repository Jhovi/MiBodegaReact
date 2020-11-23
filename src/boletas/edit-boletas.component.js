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
        fecha: new Date(),
        nombre: '',
        listaproductos: [], // tendra los productos de la boleta que se ha traido.
        temporalproductos: [], // tendrá una lista de los productos que se han traido junto con los que se va a agregar.
        subtotales:[]

    }

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)

        this.selectedusuario = this.props.location.state.boleta.UsuarioId
        this.Fecha = this.props.location.state.boleta.Fecha
        this.Direccion = this.props.location.state.boleta.Direccion
        this.DetalleBoleta = this.props.location.state.boleta.DetalleBoleta       
    }

    onChange = fecha => {
        this.setState({ fecha: fecha });
    }

    componentDidMount = () => {

        var test = []
        console.log(this.props.location.state.boleta.detalleBoleta)
        this.props.location.state.boleta.detalleBoleta.forEach(element => {
           test.push({ProductoId: element.productoId, Cantidad: element.cantidad
           })
       });
      

        this.setState({
            listaproductos: test// aqui le estoy pasando el arreglo que contiene productid y la cantidad 
        })

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
            if (users[i].id == this.props.location.state.boleta.usuarioId) {
                user = users[i];
                break;
            }
        }
        this.setState({
            users: users,
            nombre: user.nombre + " " + user.apellido
        })
    }


    setproducts = products => {
        var temp = this.state.temporalproductos

        for(var i = 0; i<this.state.listaproductos.length; i++){
            var index = products.find((value) => {            
                return value.ProductoId == this.state.listaproductos[i].productoId
            })
            temp.push(index)    
        }              
        
        this.setState({
            products: products,
            temporalproductos: temp
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


        data = {

            //UsuarioId: this.state.selectedusuario.id,
            Fecha: this.state.fecha,
            Direccion: this.direccion,
            DetalleBoleta: this.state.listaproductos
        }

        /*Axios.put('Boleta', data).then(
            res => {
                this.setState({ goBackToAdmBoleta: true })
            }
        ).catch(
            err => {
                console.log(err)
            }
        )*/
        console.log(data)
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
        var temporal = this.state.temporalproductos    
        temporal.push(producto)

        var detalle = { ProductoId: producto.id, Cantidad: 0 }
        var index = this.state.listaproductos.findIndex((value) => {
            return value.ProductoId == producto.id
        })
        var det = this.state.listaproductos

        if (index == -1) {
            det.push(detalle)           
        }
        else {
            det[index].Cantidad = 0            
        }       
        
        this.setState({
            temporalproductos: temporal,
            listaproductos: det,
        })
        this.abrirModalP()
    }
    agregarcantidad(cantidad, producto, indice) {

        var idproducto = producto.id
        var detalle = { ProductoId: idproducto, Cantidad: cantidad }
        var index = this.state.listaproductos.findIndex((value) => {
            return value.ProductoId == producto.id
        })
        var det = this.state.listaproductos
            

        if (index == -1) {
            det.push(detalle)           
        }
        else {
            det[index].Cantidad = cantidad            
        }        
        var subtotal = this.state.subtotales
        subtotal[indice] = cantidad*producto.precio
       
        this.setState({           
            listaproductos: det,
            subtotales: subtotal,           
        })


    }

    render() {
        console.log(this.state.selectedusuario)         
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
            <div className="save-card">
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
                                {this.state.temporalproductos.map((product, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{product.nombre}</td>
                                            <td><input type="number" className="form-control" onChange={e => this.agregarcantidad(e.target.value, product, index)} placeholder="Cantidad" defaultValue = {this.state.listaproductos[index].cantidad} /></td>
                                            <td>{product.precio}</td>
                                            <td>{this.state.subtotales[index]}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </form>

                    <div className="form-group">
                        <label>total</label>
                        <input type="number" className="form-control" placeholder="Precio" disabled="true" />
                    </div>

                    <button className="btn btn-primary btn-block" >Registrar</button>
                </form>
            </div>
        )
    }
}