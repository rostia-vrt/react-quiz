import React, {Component} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../store/actions/auth";


class LogOut extends Component {
    componentDidMount() {
        this.props.logout()
    }

    render() {
        return <Redirect to={'/'}/>
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps) (LogOut)