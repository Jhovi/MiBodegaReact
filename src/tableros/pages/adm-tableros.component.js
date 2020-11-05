
import Axios from 'axios';
import React, { Component } from 'react'
import Chart from '../../components/Chart';

export default class AdmTableros extends Component {

    constructor() {
        super();
        this.state = {
            chartData: {}
        }
    }

    render() {
        return (
            <Chart/>
        )
    }
}