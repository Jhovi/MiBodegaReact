import Axios from "axios";
import { Component } from "react";
import React, { useState } from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Redirect } from "react-router-dom";
import '../App.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import Moment from 'moment';

var usuarioseleccionado= 0;
var boleta = [];
export default class EditBoleta extends Component {
    
    state = {   
        listaproductos: [], // tendra los productos de la boleta que se ha traido.  
        
                    
    }

    constructor(props) {
        super(props);

        this.selectedusuario = this.props.location.state.boleta.UsuarioId
        this.Fecha = this.props.location.state.boleta.Fecha
        this.Direccion = this.props.location.state.boleta.Direccion      
        this.misproductos = this.props.location.state.productos        
        this.state = {
            miboleta : this.props.location.state.boleta.detalleBoleta    
        }
       
    }

    onChange = fecha => {
        this.setState({ fecha: fecha });
    } 

        findproducto = id => {       

        var producto;
        
        this.misproductos.map(element=>{            
            if(element.id == id){
                producto = element;
            }
        })
      
        return producto;
        
    }

    agregarcantidad(cantidad, producto, indice) {
        var idproducto = producto.id;
        
        var temp = this.state.listaproductos;       
       
        var index = this.state.listaproductos.findIndex((value) => {
            return value.ProductoId == idproducto
        })       
        if (index != -1)
        temp[index].Cantidad = parseInt(cantidad)
            

        var test = this.state.miboleta;       

        test.map(element=>{

            if(element.productoId == producto.id){
                element.cantidad = cantidad;
                element.subtotal = cantidad* producto.precio
            }

        })
        this.setState({
            miboleta:  test,
            listaproductos: temp
        })
    }


    componentDidMount = () => {  

        var test = []
       
        this.props.location.state.boleta.detalleBoleta.forEach(element => {
           test.push({id: element.id,ProductoId: element.productoId, Cantidad: element.cantidad
           })
       });
        boleta = this.props.location.state.boleta;

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
                this.setProducts(res.data)
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
        
        console.log("asdasdasd")
        console.log(this.state.selectedusuario)
    }

    handleSubmit = e => {
        e.preventDefault();
        let data = {} 
        var idusuario;
        var direccion;
        

        if(usuarioseleccionado == 0){          
        idusuario= boleta.usuarioId
        }
        if(usuarioseleccionado > 0)
        idusuario = usuarioseleccionado

        if(this.state.direccion != undefined){
        direccion = this.state.direccion       
        }else{
            direccion = boleta.direccion
        }
       
        data = {
            id: boleta.id,
            UsuarioId: idusuario,
            Fecha: this.state.fecha,
            Direccion: direccion,
            DetalleBoleta: this.state.listaproductos
        }
        console.log("esta es la info del usuario");
        console.log(idusuario);
        
        Axios.put('Boleta', data).then(
            res => {
                this.setState({ goBackToAdmBoleta: true })
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
        console.log(data)
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

    setProducts = products => {  

        this.setState({
            products: products
        })

        var test = this.state.products;
        
        for(var i = 0; i<test.length; i++){
           
            switch(test[i].categoriaId) {
                case 1:
                    test[i].categoriaId = "Whisky";
                  break;
                case 2:
                    test[i].categoriaId = "Ron";
                  break;
                case 3:
                    test[i].categoriaId = "Cerveza";
                  break;
                case 4:
                    test[i].categoriaId = "Vino";
                  break;
                case 5:
                    test[i].categoriaId = "Vodka";
                  break;
                case 6:
                    test[i].categoriaId = "Tequila";
                  break;
                case 7:
                    test[i].categoriaId = "Piqueos";
                  break;
                case 8:
                    test.categoriaId = "Otros";
                  break; 
                default:
                    // code block          
              }
        }              
        
        this.setState({
            products: test
        })        
    }

    escogerUsuario(usuario) {       
        usuarioseleccionado = usuario.id;
        console.log("este es el usuario seleccionado");
        console.log(usuarioseleccionado);
        this.setState({
            selectedusuario: usuario
        })          
        this.abrirModalU()        
    }

    escogerProducto(producto) {
        var temporal = this.state.miboleta        
        var addproducto = { id: 0, productoId: producto.id, producto: null, boletaId: null, cantidad: 0 }
        temporal.push(addproducto)    
                
        this.setState({
            miboleta: temporal
        })
        
        this.abrirModalP()
    }

    abrirModalU = () => {
        this.setState({ abiertoU: !this.state.abiertoU })       
    }
    abrirModalP = () => {        
        this.setState({ abiertoP: !this.state.abiertoP })

        console.log("asdasdsad")
        console.log(this.state.direccion);
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

        return(<div className="save-card">
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
                    onChange={e => this.state.direccion = e.target.value} />
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
                                            <td>{product.categoriaId}</td>

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
                                 {
                                    this.state.miboleta.map((element,index)=>{
                                        return (
                                            <tr key={index}>
                                                <td>{this.findproducto(element.productoId).nombre}</td>
                                                <td><input type="number" className="form-control" placeholder="Cantidad" onChange={e => this.agregarcantidad(e.target.value, this.findproducto(element.productoId), index)} defaultValue = {element.cantidad} /></td>                                                
                                                <td>{this.findproducto(element.productoId).precio}</td>
                                                <td>{element.subtotal}</td>
                                            </tr>
                                            
                                        )        

                                    })
                                }


                            </tbody>
                </table>
            </form>                   

            <button className="btn btn-primary btn-block" >Registrar</button>
        </form>
    </div>
        )
    }
}