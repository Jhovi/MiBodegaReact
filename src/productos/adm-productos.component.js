import Axios from 'axios';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown } from 'react-bootstrap';

export default class AdmProductos extends Component {


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

    render() {

        if (this.state.redirectToSaveProducto) {
            return <Redirect to={'/adm-productos/registrar'} />;
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
                                        <button type="button" className="btn btn-primary btn-sm ">Editar</button>
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
