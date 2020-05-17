
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authentication';
import classnames from 'classnames';
import { Card } from '@material-ui/core';
import { useHistory } from 'react-router'
import { MAIN_COLOR } from '../../Colors/ColorsConst';

function Login(props) {
    let history = useHistory()

    const [errors, setErrors] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    useEffect(() => {
        if (props.errors) {
            setErrors(props.errors)
        }
    }, [props.errors])


    function handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: email,
            password: password,
        }

        props.loginUser(user);
        history.push('/');
    }


    return  (
        <div className="container" style={{ marginTop: '50px', width: '500px' }}>
        <Card style={{ padding:20 }}>
            <h2 style={{ marginBottom: '40px', textAlign: 'center', color: MAIN_COLOR }}>Login</h2>
            <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.email
                        })}
                        name="email"
                        onChange={(e) =>setEmail(e.target.value)}
                        value={email}
                    />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.password
                        })}
                        name="password"
                        onChange={(e)=> setPassword(e.target.value)}
                        value={password}
                    />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group" >
                    <button type="submit" className="btn btn-primary" style={{ background: MAIN_COLOR }}>
                        Login
                </button>
                </div>
            </form>
            </Card>
        </div>
    )
}


Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login)