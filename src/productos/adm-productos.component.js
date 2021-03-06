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
        selectedproduct: { nombre: "", descripcion: "", precio: "", categoriaId: "Escoger", estado: "", stock: "" },
        newproduct:{ nombre: "", descripcion: "", precio: "", categoriaId: "Escoger", estado: "valido", stock: "" },
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
       
        var test = product;
        
        switch(test.categoriaId) {
            case 1:
                test.categoriaId = "Whisky";
              break;
            case 2:
                test.categoriaId = "Ron";
              break;
            case 3:
                test.categoriaId = "Cerveza";
              break;
            case 4:
                test.categoriaId = "Vino";
              break;
            case 5:
                test.categoriaId = "Vodka";
              break;
            case 6:
                test.categoriaId = "Tequila";
              break;
            case 7:
                test.categoriaId = "Piqueos";
              break;
            case 8:
                test.categoriaId = "Otros";
              break; 
            default:
                // code block          
          }
            
        this.setState({
            abiertoP: !this.state.abiertoP,  
            product: test,        
            selectedproduct: product
        })
        console.log("estos son los productos xd");
        console.log(this.state.products);
        console.log("estos son los productos xd");
    }

    insertarvalor1(val) {
       
        var temp = this.state.selectedproduct
        temp.categoriaId = val

        this.setState({
            selectedproduct: temp,
            dropdownOpen: !this.state.dropdownOpen
        })
        
    }    
    insertarcategoria(val) {
        var temp = this.state.newproduct      

        temp.categoriaId = val
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
       
        var test = this.state.selectedproduct;

        switch(test.categoriaId) {
            case "Whisky":
                test.categoriaId = 1;
              break;
            case "Ron":
                test.categoriaId = 2;
              break;
            case "Cerveza":
                test.categoriaId = 3;
              break;
            case "Vino":
                test.categoriaId = 4;
              break;
            case "Vodka":
                test.categoriaId = 5;
              break;
            case "Tequila":
                test.categoriaId = 6;
              break;
            case "Piqueos":
                test.categoriaId = 7;
              break;
            case "Otros":
                test.categoriaId = 8;
              break; 
            default:
                // code block          
          }

          this.setState({
            selectedproduct: test
        })

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
        
        var test = this.state.newproduct;
      
        switch(test.categoriaId) {
            case "Whisky":
                test.categoriaId = 1;
              break;
            case "Ron":
                test.categoriaId = 2;
              break;
            case "Cerveza":
                test.categoriaId = 3;
              break;
            case "Vino":
                test.categoriaId = 4;
              break;
            case "Vodka":
                test.categoriaId = 5;
              break;
            case "Tequila":
                test.categoriaId = 6;
              break;
            case "Piqueos":
                test.categoriaId = 7;
              break;
            case "Otros":
                test.categoriaId = 8;
              break; 
            default:
                // code block          
          }

          this.setState({
            newproduct: test
        })
      
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
       
        if (this.state.redirectToSaveProducto) {
            return <Redirect to={'/adm-productos/registrar'} />;
        }    

        const modalStyles = {
            position: "absolute",
            width: '400px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)'
        }

        return (
            <div className="adm-card">
                <button type="button" onClick={this.saveProductoView} id= "add-products" className="btn btn-primary  btn-register-product">Registrar Producto</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Codigo del producto</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Precio</th>                            
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
                                    <td>{product.estado}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <button type="button" id= "btn-editar" onClick={() => this.editProductoView(product)} className="btn btn-primary btn-sm " >Editar</button>
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
                                <Input input type="text" id ="nombre" className="form-control" defaultValue={this.state.selectedproduct.nombre}
                                 onChange={e => this.state.selectedproduct.nombre = e.target.value}> </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="Descripcion"> Descripcion</Label>
                                <Input type="text" id= "descripcion" className="form-control" defaultValue={this.state.selectedproduct.descripcion}
                                    onChange={e => this.state.selectedproduct.descripcion = e.target.value} > </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="Precio"> Precio</Label>
                                <Input type="number" id= "precio" className="form-control" defaultValue={this.state.selectedproduct.precio}
                                    onChange={e => this.state.selectedproduct.precio = e.target.value}> </Input>
                            </FormGroup>
                            <FormGroup>                            
                                <Label for="Categoria"> Categoria</Label>
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                        <DropdownToggle id= "categoria-edit">
                                        {this.state.selectedproduct.categoriaId}    
                                        </DropdownToggle>                                    
                                    <DropdownMenu>
                                        {this.state.categorias.map(val =>
                                     <DropdownItem                                      
                                      onClick={() => this.insertarvalor1(val)}>{val}                                     
                                      </DropdownItem>)}                                       
                                    </DropdownMenu>
                                </Dropdown>
                            </FormGroup>
                            <FormGroup>
                                <Label for="Estado"> Estado</Label>
                                <Input type="text" id= "estado" className="form-control" defaultValue={this.state.selectedproduct.estado}
                                    onChange={e => this.state.selectedproduct.estado = e.target.value}> </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="Stock"> Stock</Label>
                                <Input type="text" id= "stock" className="form-control" defaultValue={this.state.selectedproduct.stock}
                                    onChange={e => this.state.selectedproduct.stock = e.target.value}> </Input>
                            </FormGroup>

                        </ModalBody>

                        <ModalFooter>
                            <Button color="primary" id= "btn-actualizar" onClick={this.ActualizarProducto}>Actualizar</Button>
                            <Button color="secondary" onClick={this.CerrarModalP}>Cerrar</Button>
                        </ModalFooter>

                    </Modal>

                    <Modal isOpen={this.state.crearproducto} style={modalStyles}>
                        <ModalHeader>
                            Agregar producto
                    </ModalHeader>

                        <ModalBody>

                            <FormGroup>
                                <Label for="Nombre"> Nombre</Label>
                                <Input input type="text" id= "nombre" className="form-control" placeholder = "Nombre"
                                 onChange={e => this.state.newproduct.nombre = e.target.value}> </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="Descripcion"> Descripcion</Label>
                                <Input type="text" id= "descripcion" className="form-control" placeholder = "Descripción"
                                    onChange={e => this.state.newproduct.descripcion = e.target.value} > </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="Precio"> Precio</Label>
                                <Input type="number" id= "precio" className="form-control" placeholder = "Precio"
                                    onChange={e => this.state.newproduct.precio = e.target.value}> </Input>
                            </FormGroup>
                            <FormGroup>                            
                                <Label for="Categoria"> Categoria</Label>
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                        <DropdownToggle id= "categoria">
                                        {this.state.newproduct.categoriaId}    
                                        </DropdownToggle>
                                    <DropdownMenu>
                                    {this.state.categorias.map(val =>
                                     <DropdownItem
                                        onClick={() => this.insertarcategoria(val)}>{val}
                                     </DropdownItem>)}                                       
                                    </DropdownMenu>
                                </Dropdown>
                            </FormGroup>                            
                            <FormGroup>
                                <Label for="Stock"> Stock</Label>
                                <Input type="text" id= "stock" className="form-control" placeholder = "Stock"
                                    onChange={e => this.state.newproduct.stock = e.target.value}> </Input>
                            </FormGroup>

                        </ModalBody>

                        <ModalFooter>
                            <Button id = "btn-crear" color="primary" onClick={this.CrearProducto}>Crear</Button>
                            <Button color="secondary" onClick={this.CerrarCrearProducto}>Cerrar</Button>
                        </ModalFooter>

                    </Modal>
                </table>
            </div>
        )
    }



}
