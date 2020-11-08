import Axios from 'axios';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown } from 'react-bootstrap';
import EditProducto from './../productos/edit-productos.component';

export default class AdmProductos extends Component {

    constructor(props) {
        super(props);
    }

    state = {};

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
            redirectToSaveProducto: true
        })

    }

    editProductoView(product) {
        console.log(product)
        this.setState({
            redirectToEditProducto: true,
            selectedproduct: product
        })
    }       

    render() {

        if (this.state.redirectToSaveProducto) {
            return <Redirect to={'/adm-productos/registrar'} />;
        }

        if (this.state.redirectToEditProducto) {
            return <Redirect to={{
                pathname: "/adm-productos/editar",
                state: {producto: this.state.selectedproduct}}} />;
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
                                        <button type="button" onClick={()=>this.editProductoView(product)} className="btn btn-primary btn-sm " >Editar</button>                                                            
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }



}
