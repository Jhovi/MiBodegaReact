import { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Home extends Component {


    render() {

        if (this.props.user) {
            return (
                <h2>Hi {this.props.user.id}</h2>
            )
        } else {
            return (
                <Redirect to={'/login'} />
            )
        }


    }
}