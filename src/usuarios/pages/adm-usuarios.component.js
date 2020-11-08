import Axios from 'axios';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import Notifications, { notify } from '../../components/Notification';

export default class AdmUsuarios extends Component {

    constructor(props) {
        super(props)


    }


    state = {
        emptyUser: {
            nombre: '',
            apellido: '',
            correo: '',
            dni: 0,
            telefono: 0,
            password: '',
            fechaNacimiento: new Date("2002", "01", "01"),
            genero: null
        },
        selectedFile: null
    };

    componentDidMount = () => {
        if (this.props) {
            if (this.props.location.state?.showModal) {
                if (this.props.location.state?.process === 'created') {
                    notify('created')
                } else if (this.props.location.state?.process === 'edit') {
                    notify('edit')
                }
            }
        }
        this.loadUsers();
    }

    loadUsers() {
        Axios.get('Usuario').then(
            res => {
                this.setUsers(res.data)
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

    editUserView = (user) => {
        this.setState({
            goToEditUser: true,
            id: user.id,
            user: user
        })
    }

    onFileChange = event => {

        // Update the state 
        this.setState({ selectedFile: event.target.files[0] });

    };

    onFileUpload = () => {

        const formData = new FormData();

        formData.append(
            "files",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file 
        console.log(this.state.selectedFile);

        Axios({
            url: 'FileUpload', method: 'post',
            responseType: 'text', data: formData
        }).then(
            res => {
                console.log(res)
                Axios.post('Usuario/loadUsersExcel/' + this.state.selectedFile.name).then(
                    res => {
                        this.loadUsers();
                    }
                )
            }
        )
    };




    render() {

        if (this.state.redirectToSaveUsuario) {
            return <Redirect to={{
                pathname: '/register/0',
                state: { user: this.state.emptyUser }
            }} />;
        }

        if (this.state.goToEditUser) {
            return <Redirect to={{
                pathname: '/register/' + this.state.id,
                state: { user: this.state.user }
            }} />;
        }

        return (
            <div>
                <button type="button" onClick={this.saveUsuarioView} className="btn btn-primary  btn-register-user">Registrar Usuario</button>
                <NavDropdown title="Export" id="basic-nav-dropdown" className="btn btn-export-file">
                    <NavDropdown.Item onClick={this.downloadPDF}>Export PDF</NavDropdown.Item>
                    <NavDropdown.Item onClick={this.donwloadCsv}>Export Excel</NavDropdown.Item>
                </NavDropdown>

                <div>
                    <input class="form-control-file" type="file" onChange={this.onFileChange} />
                    <br></br>
                    <button className="btn btn-primary" onClick={this.onFileUpload}>
                        Subir archivo
                </button>
                </div>
                <br></br>
                <Notifications />
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
                                        <button type="button" onClick={() => this.editUserView(user)} className="btn btn-primary btn-sm ">Editar</button>
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