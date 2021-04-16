import Axios from 'axios';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';


export default class AdmBoleta extends Component {

    constructor(props) {
        super(props);
    }

    state = {};

    componentDidMount = () => {

        Axios.get('Boleta').then(
            res => {
                this.setBoletas(res.data)                              
            },
            err => {
                console.log(err);
            }
        )
    }

    setBoletas = bills => {
        this.setState({
            bills: bills
        })
    }

    saveBoletaView = () => {
        this.setState({
            redirectToSaveBoleta: true
        })

    }

    editBoletaView(bill) {       
        this.setState({
            redirectToEditboleta: true,
            selectedbill: bill
        })
    }       

    render() {

        if (this.state.redirectToSaveBoleta) {
            return <Redirect to={'/adm-boletas/registrar'} />;
        }

        if (this.state.redirectToEditboleta) {
            return <Redirect to={{
                pathname: "/adm-boletas/editar",
                state: {boleta: this.state.selectedbill}}} />;
        }
      
        return (
            <div className="adm-card">
                <button type="button" onClick={this.saveBoletaView} id= "add-boletas" className="btn btn-primary  btn-register-product">Registrar Boleta</button>                                
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Codigo de la boleta</th>
                            <th scope="col">fecha</th>
                            <th scope="col">direccion</th>
                            <th scope="col">total</th>                           
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>                   
                    <tbody>

                        {this.state.bills && this.state.bills.map((bill, index) => {
                            return (
                                
                                <tr key={index}>                                   
                                    <td>{bill.id}</td>                               
                                    <td>{bill.fecha}</td>
                                    <td>{bill.direccion}</td>
                                    <td>{bill.total}</td>                                                                     
                                    <td>
                                        <button type="button" onClick={()=>this.editBoletaView(bill)} className="btn btn-primary btn-sm " >Editar</button>                                                                         
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
