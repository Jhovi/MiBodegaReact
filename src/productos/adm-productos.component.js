import Axios from 'axios';
import React, { Component, useState } from 'react'
import { Redirect } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown } from 'react-bootstrap';
import EditProducto from './../productos/edit-productos.component';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


export default class AdmProductos extends Component {

    constructor(props) {
        super(props);        
    }

    state = {
        valor1: '',
        selectedproduct: { nombre: "", descripcion: "", precio: "", categoria: "", estado: "", stock: "" },
        newproduct:{ nombre: "", descripcion: "", precio: "", categoria: "Escoger", estado: "valido", stock: "" },
        categorias: ["Whisky", "Ron", "Cerveza", "Vino", "Vodka", "Tequila", "Piqueos", "Otros"],
        dropDownValue: ""
    }

    componentDidMount = () => {

        Axios.get('Producto').then(
            res => {
                this.setProducts(res.data)
            },
            err => {
                console.log(err);
            }
        )

    }

    setProducts = products => {
        this.setState({
            products: products
        })
    }

    saveProductoView = () => {
        this.setState({
            crearproducto: !this.state.crearproducto
        })

    }

    editProductoView(product) {

        this.setState({
            abiertoP: !this.state.abiertoP,          
            selectedproduct: product
        })
    }

    insertarvalor1(val) {       
        var temp = this.state.selectedproduct
        temp.categoria = val
        this.setState({
            selectedproduct: temp,
            dropdownOpen: !this.state.dropdownOpen
        })       
    }    
    insertarcategoria(val) {
        var temp = this.state.newproduct
        temp.categoria = val
        this.setState({
            newproduct: temp,
            dropdownOpen: !this.state.dropdownOpen
        })       
    }  

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })

    }

    CerrarModalP = () => {
        this.setState({
            abiertoP: !this.state.abiertoP
        })
    }

    CerrarCrearProducto = () => {
        this.setState({
            crearproducto: !this.state.crearproducto
        })
    }

    ActualizarProducto = () => {
        Axios.put('Producto', this.state.selectedproduct).then(
            res => {
                this.setState({ abiertoP: !this.state.abiertoP })
            }
        ).catch(
            err => {
                console.log(err)
            }
        )   
    }
    
    CrearProducto = () => {       
        Axios.post('Producto', this.state.newproduct).then(
            res => {
                this.setState({  crearproducto: !this.state.crearproducto })
            }
        ).catch(
            err => {
                console.log(err)
            }
        ) 
    }

    changeValue(e) {
        this.setState({dropDownValue: e.currentTarget.textContent})
      }


    render() {
        console.log(this.state.valor1)
        if (this.state.redirectToSaveProducto) {
            return <Redirect to={'/adm-productos/registrar'} />;
        }    

        const modalStyles = {

            position: "absolute",
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)'
        }

        return (
            <div>
                <button type="button" onClick={this.saveProductoView} className="btn btn-primary  btn-register-product">Registrar Producto</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Codigo del producto</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.products && this.state.products.map((product, index) => {
                            return (

                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>{product.nombre}</td>
                                    <td>{product.descripcion}</td>
                                    <td>{product.precio}</td>
                                    <td>{product.categoria}</td>
                                    <td>{product.estado}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <button type="button" onClick={() => this.editProductoView(product)} className="btn btn-primary btn-sm " >Editar</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>

                    <Modal isOpen={this.state.abiertoP} style={modalStyles}>
                        <ModalHeader>
                            Producto a editar
                    </ModalHeader>

                        <ModalBody>

                            <FormGroup>
                                <Label for="Nombre"> Nombre</Label>
                                <Input input type="text" className="form-control" defaultValue={this.state.selectedproduct.nombre}
                                 onChange={e => this.state.selectedproduct.nombre = e.target.value}> </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="Descripcion"> Descripcion</Label>
                                <Input type="text" className="form-control" defaultValue={this.state.selectedproduct.descripcion}
                                    onChange={e => this.state.selectedproduct.descripcion = e.target.value} > </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="Precio"> Precio</Label>
                                <Input type="number" className="form-control" defaultValue={this.state.selectedproduct.precio}
                                    onChange={e => this.state.selectedproduct.precio = e.target.value}> </Input>
                            </FormGroup>
                            <FormGroup>                            
                                <Label for="Categoria"> Categoria</Label>
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle>
                                    {this.state.selectedproduct.categoria}    
                                </DropdownToggle>                                    
                                    <DropdownMenu>
                                    {this.state.categorias.map(val =>
                                     <DropdownItem
                                      onClick={() => this.insertarvalor1(val)}>{val}
                                      <div onClick={this.changeValue}></div>
                                      </DropdownItem>)}                                       
                                    </DropdownMenu>
                                </Dropdown>
                            </FormGroup>
                            <FormGroup>
                                <Label for="Estado"> Estado</Label>
                                <Input type="text" className="form-control" defaultValue={this.state.selectedproduct.estado}
                                    onChange={e => this.state.selectedproduct.estado = e.target.value}> </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="Stock"> Stock</Label>
                                <Input type="text" className="form-control" defaultValue={this.state.selectedproduct.stock}
                                    onChange={e => this.state.selectedproduct.stock = e.target.value}> </Input>
                            </FormGroup>

                        </ModalBody>

                        <ModalFooter>
                            <Button color="primary" onClick={this.ActualizarProducto}>Actualizar</Button>
                            <Button color="secondary" onClick={this.CerrarModalP}>Cerrar</Button>
                        </ModalFooter>

                    </Modal>

                    <Modal isOpen={this.state.crearproducto} style={modalStyles}>
                        <ModalHeader>
                            Agregar poroducto
                    </ModalHeader>

                        <ModalBody>

                            <FormGroup>
                                <Label for="Nombre"> Nombre</Label>
                                <Input input type="text" className="form-control" placeholder = "Nombre"
                                 onChange={e => this.state.newproduct.nombre = e.target.value}> </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="Descripcion"> Descripcion</Label>
                                <Input type="text" className="form-control" placeholder = "Descripción"
                                    onChange={e => this.state.newproduct.descripcion = e.target.value} > </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="Precio"> Precio</Label>
                                <Input type="number" className="form-control" placeholder = "Precio"
                                    onChange={e => this.state.newproduct.precio = e.target.value}> </Input>
                            </FormGroup>
                            <FormGroup>                            
                                <Label for="Categoria"> Categoria</Label>
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle>
                                    {this.state.newproduct.categoria}    
                                </DropdownToggle>
                                    <DropdownMenu>
                                    {this.state.categorias.map(val =>
                                     <DropdownItem onClick={() => this.insertarcategoria(val)}>{val}</DropdownItem>)}                                       
                                    </DropdownMenu>
                                </Dropdown>
                            </FormGroup>                            
                            <FormGroup>
                                <Label for="Stock"> Stock</Label>
                                <Input type="text" className="form-control" placeholder = "Stock"
                                    onChange={e => this.state.newproduct.stock = e.target.value}> </Input>
                            </FormGroup>

                        </ModalBody>

                        <ModalFooter>
                            <Button color="primary" onClick={this.CrearProducto}>Actualizar</Button>
                            <Button color="secondary" onClick={this.CerrarCrearProducto}>Cerrar</Button>
                        </ModalFooter>

                    </Modal>
                </table>
            </div>
        )
    }



}
