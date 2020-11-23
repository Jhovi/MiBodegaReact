
import Axios from 'axios';
import React, { Component } from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Bar, Pie } from 'react-chartjs-2';

class Chart extends Component {

    constructor() {
        super();
        this.state = {
            pieChartData: {},
            barChartData: {},
            fechaDesde: '',
            fechaHasta: ''

        }
    }

    componentDidMount() {
        this.getChartData();

    }

    getChartData() {

        Axios.get('Boleta/FetchTop5Customers').then(
            res => {
                var labelsToChart = [];
                var totalToChart = [];
                for (var i = 0; i < res.data.length; i++) {
                    labelsToChart.push(res.data[i].nombre);
                    totalToChart.push(res.data[i].total);
                }
                this.setState({
                    pieChartData: {
                        labels: labelsToChart,
                        datasets: [
                            {
                                label: 'Nombre clientes',
                                data: totalToChart,
                                backgroundColor: [
                                    'rgba(255,99,132,0.6)',
                                    'rgba(54,162,235,0.6)',
                                    'rgba(255,206,86,0.6)',
                                    'rgba(75,192,192,0.6)',
                                    'rgba(153,102,255,0.6)',
                                ]
                            }
                        ]
                    }
                })
            }, err => {
                console.log(err)
            })
    }

    onChangeDateDesde = (fecha) => {

        var fechaToServiceDesde = fecha.toLocaleDateString('en-US')

        this.setState({
            fechaDesde: fecha,
            fechaToServiceDesde: fechaToServiceDesde
        })

        Axios.get('Boleta/FetchTop5Products?inicio=' + fechaToServiceDesde + "&fin=" + this.state.fechaToServiceHasta).then(
            res => {
                console.log(res.data)
                var labelsToChart = [];
                var totalToChart = [];
                for (var i = 0; i < res.data.length; i++) {
                    labelsToChart.push(res.data[i].nombre);
                    totalToChart.push(res.data[i].cantidad);
                }
                this.setState({
                    barChartData: {
                        labels: labelsToChart,
                        datasets: [
                            {
                                label: 'Cantidad',
                                data: totalToChart,
                                backgroundColor: [
                                    'rgba(255,150,99,0.6)',
                                    'rgba(54,82,130,0.6)',
                                    'rgba(53,206,30,0.6)',
                                    'rgba(250,10,100,0.6)',
                                    'rgba(153,102,255,0.6)',
                                ]
                            }
                        ]
                    }
                })
            }, err => {
                console.log(err);
            }
        )



    }

    onChangeDateHasta = (fecha) => {

        var fechaToServiceHasta = fecha.toLocaleDateString('en-US')

        this.setState({
            fechaHasta: fecha,
            fechaToServiceHasta: fechaToServiceHasta
        })

        Axios.get('Boleta/FetchTop5Products?inicio=' + this.state.fechaToServiceDesde + "&fin=" + fechaToServiceHasta).then(
            res => {
                var labelsToChart = [];
                var totalToChart = [];
                for (var i = 0; i < res.data.length; i++) {
                    labelsToChart.push(res.data[i].nombre);
                    totalToChart.push(res.data[i].cantidad);
                }
                this.setState({
                    barChartData: {
                        labels: labelsToChart,
                        datasets: [
                            {
                                label: 'Cantidad',
                                data: totalToChart,
                                backgroundColor: [
                                    'rgba(255,150,99,0.6)',
                                    'rgba(54,82,130,0.6)',
                                    'rgba(53,206,30,0.6)',
                                    'rgba(250,10,100,0.6)',
                                    'rgba(153,102,255,0.6)',
                                ]
                            }
                        ]
                    }
                })
            }, err => {
                console.log(err);
            }
        )
    }

    render() {
        return (

            <div className="adm-card" >
                <Pie height="100px"
                    data={this.state.pieChartData}
                    options={{
                        title: {
                            display: true,
                            text: 'Gasto de clientes mas frecuentes',
                            fontSize: 20
                        },
                        legend: {
                            display: false,
                            position: 'bottom'
                        }
                    }}
                />
                <br></br>

                <Bar height="100px"
                    data={this.state.barChartData}
                    options={{
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        title: {
                            display: true,
                            text: 'Promedio de productos mas vendidos',
                            fontSize: 20
                        },
                        legend: {
                            display: false,
                            position: 'bottom'
                        }
                    }}
                />

                <label>Seleccione intervalo de fechas</label>
                <div className="date-desde">
                    <div className="form-group ml-5">
                        <label>Fecha desde</label>
                        <Datepicker className="form-control ml-4" selected={this.state.fechaDesde} onChange={e => this.onChangeDateDesde(e)} dateFormat='dd/MM/yyyy'
                            showYearDropdown scrollableMonthYearDropdown />
                    </div>
                    <div className="form-group ">
                        <label className="ml-5">Fecha hasta</label>
                        <Datepicker className="form-control ml-4" selected={this.state.fechaHasta} onChange={this.onChangeDateHasta} dateFormat='dd/MM/yyyy'
                            showYearDropdown scrollableMonthYearDropdown />
                    </div>
                </div>
            </div>
        )
    }
}

export default Chart;