import Axios from 'axios';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown } from 'react-bootstrap';

export default class AdmUsuarios extends Component {


    state = {};

    componentDidMount = () => {

        Axios.get('Usuario').then(
            res => {
                this.setUsers(res.data)
                console.log(this.state.users);
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

    saveUsuarioView = () => {
        this.setState({
            redirectToSaveUsuario: true
        })

    }

    downloadPDF = () => {
        Axios({
            url: 'Usuario/getpdf', method: 'get',
            responseType: 'blob'
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf');
            document.body.appendChild(link);
            link.click();
        })
    }

    donwloadCsv = () => {
        Axios({
            url: 'Usuario/GetExcel', method: 'get',
            responseType: 'blob'
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.csv');
            document.body.appendChild(link);
            link.click();
        })
    }

    render() {

        if (this.state.redirectToSaveUsuario) {
            return <Redirect to={'/register'} />;
        }

        return (
            <div>
                <button type="button" onClick={this.saveUsuarioView} className="btn btn-primary  btn-register-user">Registrar Usuario</button>
                <NavDropdown title="Export" id="basic-nav-dropdown" className="btn btn-export-file">
                    <NavDropdown.Item onClick={this.downloadPDF}>Export PDF</NavDropdown.Item>
                    <NavDropdown.Item onClick={this.donwloadCsv}>Export Excel</NavDropdown.Item>
                </NavDropdown>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Codigo Cliente</th>
                            <th scope="col">Nombres</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">DNI</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.users && this.state.users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.nombre} {user.apellido}</td>
                                    <td>{user.correo}</td>
                                    <td>{user.telefono}</td>
                                    <td>{user.dni}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary btn-sm ">Editar</button>
                                        <button type="button" className="btn btn-danger btn-sm ml-2">Eliminar</button>
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
