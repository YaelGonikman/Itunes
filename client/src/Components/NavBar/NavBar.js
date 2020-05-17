import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';
import { MAIN_COLOR } from '../../Colors/ColorsConst';
import { IconButton, Typography } from '@material-ui/core';

const fontStyle = {
    color: '#eceff1',
    fontSize: 22
}

function NavBar(props) {
    const { isAuthenticated, user } = props.auth;

    const onLogout = (e) => {
        e.preventDefault();
        props.logoutUser(props.history);
    }

    const authLinks = (
        <ul className="navbar-nav ml-auto">
            <Link href="#" className="nav-link" onClick={onLogout.bind(this)} style={fontStyle} >
                LOGOUT
                </Link>
        </ul>
    )
    const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item" >
                <Link className="nav-link" to="/register">
                    <IconButton style={fontStyle} >
                        Sign Up
                    </IconButton>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">
                    <IconButton style={fontStyle}>
                        Login
                        </IconButton>
                </Link>
            </li>
        </ul>
    )
    return (
        <nav className="navbar navbar-expand-lg" style={{ background: MAIN_COLOR }}>
            <Link className="navbar-brand" to="/" style={fontStyle}>
                <img src={require('../../Images/Itunes.jpg')} style={{ height: 80, width: 80 }} />
                <Typography variant="overline" style={{ color: '#eceff1', fontSize: 14 }}>Welcome {user.name}</Typography>
            </Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {isAuthenticated ? authLinks : guestLinks}
            </div>
        </nav>
    )
}

NavBar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(NavBar));