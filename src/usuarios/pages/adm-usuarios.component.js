import Axios from 'axios';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import Notifications, { notify } from '../../components/Notification';
import ReactPaginate from 'react-paginate';

export default class AdmUsuarios extends Component {

    constructor(props) {
        super(props)

        this.state = {
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 5,
            currentPage: 0,
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
        }
        this.handlePageClick = this.handlePageClick.bind(this);

    }


 
  

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
		const data = this.state.orgtableData;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			tableData:slice
		})
	
    }

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
                var data = res.data;
				
                var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    orgtableData :res.data,
                    tableData:slice
                })
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
        var extension = '';

        formData.append(
            "files",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        var pos = this.state.selectedFile.name.indexOf('.');
        extension = this.state.selectedFile.name.slice(-(this.state.selectedFile.name.length - pos));
        // Details of the uploaded file 
        console.log(this.state.selectedFile);
        console.log(extension);


        if (extension == '.txt') {
            Axios({
                url: 'FileUpload', method: 'post',
                responseType: 'text', data: formData
            }).then(
                res => {
                    console.log(res)
                    Axios.post('Usuario/LoadUsers/' + this.state.selectedFile.name).then(
                        res => {
                            notify('archivoAdded')
                            this.loadUsers();
                        },
                        err => {
                            notify('archivoProblem')
                        }
                    )
                }
            )
        } else if (extension == '.xlsx') {
            Axios({
                url: 'FileUpload', method: 'post',
                responseType: 'text', data: formData
            }).then(
                res => {
                    console.log(res)
                    Axios.post('Usuario/loadUsersExcel/' + this.state.selectedFile.name).then(
                        res => {
                            notify('archivoAdded')
                            this.loadUsers();
                        },
                        err => {
                            notify('archivoProblem')
                        }
                    )
                }
            )
        } else {
            notify('archivoProblem')
        }

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
            <div className="adm-card">
                <button type="button" onClick={this.saveUsuarioView} className="btn btn-primary  btn-register-user">Registrar Usuario</button>
                <NavDropdown title="Export" id="btn-export" className="btn btn-export-file">
                    <NavDropdown.Item id="btn-export-pdf" onClick={this.downloadPDF}>Export PDF</NavDropdown.Item>
                    <NavDropdown.Item id="btn-export-excel" onClick={this.donwloadCsv}>Export Excel</NavDropdown.Item>
                </NavDropdown>

                <div>
                    <input class="form-control-file" id="btn-import-file" type="file" onChange={this.onFileChange} />
                    <br></br>
                    <button className="btn btn-primary" id="btn-upload" onClick={this.onFileUpload}>
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

                        {this.state.tableData && this.state.tableData.map((user, index) => {
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
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>
        )
    }



}