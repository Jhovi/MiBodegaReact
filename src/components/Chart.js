 import Axios from 'axios';
 import React, { Component } from 'react';
 import { Bar, Pie } from 'react-chartjs-2';
 
 class Chart extends Component {
 
     constructor() {
         super();
         this.state = {
             chartData: {}
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
                     chartData: {
                         labels: labelsToChart,
                         datasets: [
                             {
                                 label: 'Nombre clientes',
                                 data: totalToChart,
 
                             }
                         ]
                     }
                 })
             }, err => {
                 console.log(err)
             })
     }
 
     render() {
         return (
 
             <div className="chart">
                 <Bar
                     data={this.state.chartData}
                     options={{
                         title: {
                             display: true,
                             text: 'Promedio de productos mas vendidos',
                             fontSize: 20
                         },
                         legend: {
                             display: true,
                             position: 'bottom'
                         }
                     }}
                 />
             </div>
         )
     }
 }
 
 export default Chart;
 