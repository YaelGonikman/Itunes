import { MAIN_COLOR } from '../../Colors/ColorsConst';
import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authentication';
import classnames from 'classnames';
import { Card } from '@material-ui/core';

function Register(props) {
    const [errors, setErrors] = useState("");
    const [password, setPassword] = useState("");
    const [email, setemail] = useState("");
    const [name, setname] = useState("");


    const handleSubmit=(e)=> {
        e.preventDefault();

        const user = {
            name: name,
            email: email,
            password: password,
        }

        props.registerUser(user, props.history);
    }

    useEffect(() => {
        if (props.errors) {
            setErrors(props.errors)
        }
    }, [props.errors])

        return (
            <div className="container" style={{ marginTop: '50px', width: '500px' }}>
              <Card style={{ padding:20 }}>
                <h2 style={{ marginBottom: '40px', textAlign: 'center', color: MAIN_COLOR }}>
                    Registration
            </h2>
                <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.name
                            })}
                            name="name"
                            onChange={(e) =>setname(e.target.value)}
                            value={name}
                        />
                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.email
                            })}
                            name="email"
                            onChange={(e) =>setemail(e.target.value)}
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
                            onChange={(e) =>setPassword(e.target.value)}
                            value={password}
                        />
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary" style={{ background: MAIN_COLOR }}>
                            Register User
                    </button>
                    </div>
                </form>
                </Card>
            </div>
        )
    }


Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    errors: state.errors,
    auth: PropTypes.object.isRequired
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register))