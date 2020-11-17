import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ee from 'event-emitter';
import { FcApproval, FcHighPriority, IconName } from "react-icons/fc";

const Container = styled.div`
    background-color: #444;
    color: white;
    padding: 16px;
    position: fixed;
    top: ${props => props.top}px;
    right: 16px;
    z-index: 999;
    transition: top 0.5s ease;  

    > i {
        margin-left: 8px;
    }
`;

const emitter = new ee();

export const notify = (msg) => {
    emitter.emit('notification', msg);
}

export default class Notifications extends Component {

    constructor(props) {
        super(props)

        this.state = {
            top: -100,
            msg: ''
        }

        this.timeout = null;

        emitter.on('notification', (msg) => {
            this.onShow(msg)
        })

    }

    onShow = (msg) => {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.setState({ top: -100 }, () => {
                this.timeout = setTimeout(() => {
                    this.showNotification(msg);
                }, 500)
            })
        } else {
            this.showNotification(msg);
        }
    }

    showNotification = (msg) => {
        this.setState({
            top: 16,
            msg
        }, () => {
            this.timeout = setTimeout(() => {
                this.setState({
                    top: -100
                })
            }, 3000);
        })
    }
    render() {
        if (this.state.msg === 'created') {
            return (
                <Container top={this.state.top}> <FcApproval /> Creado correctamente </Container>
            )
        } else if (this.state.msg === 'edit') {
            return (
                <Container top={this.state.top}> <FcApproval /> Actualizado correctamente </Container>
            )
        } else if (this.state.msg === 'archivoAdded') {
            return (
                <Container top={this.state.top}> <FcApproval /> Usuarios agregados correctamente </Container>
            )
        } else if (this.state.msg === 'archivoProblem') {
            return (
                <Container top={this.state.top}> <FcHighPriority /> Problemas al leer el archivo </Container>
            )
        }else {
            return (
                <Container top={this.state.top}> <FcHighPriority /> Datos incorrectos </Container>
            )
        }

    }
}