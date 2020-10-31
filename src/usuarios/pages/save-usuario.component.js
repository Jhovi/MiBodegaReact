import Axios from "axios";
import { Component } from "react";

export default class SaveUsuario extends Component {

    handleSubmit = e => {
        e.preventDefault();
        let data = {}
        if (this.password === this.confirmPassword) {
            data = {
                nombre: this.nombre,
                apellido: this.apellido,
                correo: this.correo,
                dni: this.dni,
                telefono: this.telefono,
                password: this.password
            }

            Axios.post('Usuario', data).then(
                res => {
                    console.log(res)
                }
            ).catch(
                err => {
                    console.log(err)
                }
            )
        }

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Registrar Usuario</h3>



                <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" className="form-control" placeholder="Nombre"
                        onChange={e => this.nombre = e.target.value} />
                </div>

                <div className="form-group">
                    <label>Apellido</label>
                    <input type="text" className="form-control" placeholder="Apellido"
                        onChange={e => this.apellido = e.target.value} />
                </div>

                <div className="form-group">
                    <label>Correo</label>
                    <input type="email" className="form-control" placeholder="Correo"
                        onChange={e => this.correo = e.target.value} />
                </div>


                <div className="form-group">
                    <label>Telefono</label>
                    <input type="number" className="form-control" placeholder="Telefono"
                        onChange={e => this.telefono = e.target.value} />
                </div>

                <div className="form-group">
                    <label>DNI</label>
                    <input type="number" className="form-control" placeholder="Dni"
                        onChange={e => this.dni = e.target.value} />
                </div>

                <div className="form-group">
                    <label>Contraseña</label>
                    <input type="password" className="form-control" placeholder="Contraseña"
                        onChange={e => this.password = e.target.value} />
                </div>

                <div className="form-group">
                    <label>Confirmar Contraseña</label>
                    <input type="password" className="form-control" placeholder="Confirmar contraseña"
                        onChange={e => this.confirmPassword = e.target.value} />
                </div>

                <button className="btn btn-primary btn-block">Registrar</button>
            </form>
        )
    }
}