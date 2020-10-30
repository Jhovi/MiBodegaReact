import { Component } from "react";

export default class Home extends Component {


    render() {

        if (this.props.user) {
            return (
                <h2>Hi {this.props.user.id}</h2>
            )
        }

        return (
            <div>
                <h1>Error</h1>

                <h2>You have to log in first!!</h2>
            </div>
        )
    }
}