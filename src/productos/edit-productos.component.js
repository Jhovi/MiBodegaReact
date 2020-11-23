import Axios from "axios";
import { Component } from "react";
import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Redirect } from "react-router-dom";
import '../App.css';

export default class EditProducto extends Component {

    state = {
    }

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.nombre = this.props.location.state.producto.nombre
        this.descripcion = this.props.location.state.producto.descripcion
        this.precio = this.props.location.state.producto.precio
        this.categoria = this.props.location.state.producto.categoria
        this.estado = this.props.location.state.producto.estado
        this.stock = this.props.location.state.producto.stock

    }


    handleSubmit = e => {
        e.preventDefault();
        let data = {}


        data = {
            id: this.props.location.state.producto.id,
            nombre: this.nombre,
            descripcion: this.descripcion,
            precio: this.precio,
            categoria: this.categoria,
            estado: this.estado,
            stock: this.stock

        }

        Axios.put('Producto', data).then(
            res => {
                this.setState({ goBackToAdmProducto: true })
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


    render() {

        if (this.state.goBackToAdmProducto) {
            return <Redirect to={'/adm-productos'} />
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>Editar Producto</h3>

                    <div className="form-group">
                        <label>Nombre</label>
                        <input type="text" className="form-control" placeholder="Nombre" defaultValue={this.props.location.state.producto.nombre}
                            onChange={e => this.nombre = e.target.value} />
                    </div>


                    <div className="form-group">
                        <label>Descripción</label>
                        <input type="text" className="form-control" placeholder="Descripcion" defaultValue={this.props.location.state.producto.descripcion}
                            onChange={e => this.descripcion = e.target.value} />
                    </div>

                    <div className="form-group">
                        <label>Precio</label>
                        <input type="number" className="form-control" placeholder="Precio" defaultValue={this.props.location.state.producto.precio}
                            onChange={e => this.precio = e.target.value} />
                    </div>

                    <div className="form-group">
                        <label>Categoria</label>
                        <input type="text" className="form-control" placeholder="Categoria" defaultValue={this.props.location.state.producto.categoria}
                            onChange={e => this.categoria = e.target.value} />
                    </div>

                    <div className="form-group">
                        <label>Estado</label>
                        <input type="text" className="form-control" placeholder="Estado" defaultValue={this.props.location.state.producto.estado}
                            onChange={e => this.estado = e.target.value} />
                    </div>

                    <div className="form-group">
                        <label>Stock</label>
                        <input type="number" className="form-control" placeholder="Stock" defaultValue={this.props.location.state.producto.stock}
                            onChange={e => this.stock = e.target.value} />
                    </div>

                    <button className="btn btn-primary btn-block" >Registrar</button>
                </form>
            </div>
        )
    }
}