import Axios from "axios";
import { Component } from "react";
import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Redirect } from "react-router-dom";
import '../App.css';

export default class SaveProducto extends Component {

    state = {
        
    }
      
    handleSubmit = e => {
        e.preventDefault();
        let data = {}

            data = {
                nombre: this.nombre,
                descripcion: this.descripcion,
                precio: this.precio,
                categoria: this.categoria,
                estado: this.estado,
                stock: this.stock
               
            }


            Axios.post('Producto', data).then(
                res => {
                    this.setState({ goBackToAdmProducto: true })
                }
            ).catch(
                err => {
                    console.log(err)
                }
            )   

    }

    render() {

        if (this.state.goBackToAdmProducto) {
            return <Redirect to={'/adm-productos'} />
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Registrar Producto</h3>        

                <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" className="form-control" placeholder="Nombre"
                        onChange={e => this.nombre = e.target.value} />
                </div>

                <div className="form-group">
                    <label>Descripción</label>
                    <input type="text" className="form-control" placeholder="Descripcion"
                        onChange={e => this.descripcion = e.target.value} />
                </div>               

                <div className="form-group">
                    <label>Precio</label>
                    <input type="number" className="form-control" placeholder="Precio"
                        onChange={e => this.precio = e.target.value} />
                </div>

                <div className="form-group">
                    <label>Categoria</label>
                    <input type="text" className="form-control" placeholder="Categoria"
                        onChange={e => this.categoria = e.target.value} />
                </div> 

                <div className="form-group">
                    <label>Estado</label>
                    <input type="text" className="form-control" placeholder="Estado"
                        onChange={e => this.estado = e.target.value} />
                </div>      

                <div className="form-group">
                    <label>Stock</label>
                    <input type="text" className="form-control" placeholder="Stock"
                        onChange={e => this.stock = e.target.value} />
                </div>  

                <button className="btn btn-primary btn-block">Registrar</button>
            </form>
        )
    }
}