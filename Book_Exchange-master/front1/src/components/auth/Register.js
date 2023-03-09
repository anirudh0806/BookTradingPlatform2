import React, { Component } from 'react';
import './Form.css';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: null,
      password: null,
      passwordCheck: null,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = this.state;
    await Axios.post('http://localhost:5000/users/register', data)
      .then((res) => {
        alert('Registered Successfully');
        window.location = '/login';
      })
      .catch((error) => {
        this.setState({
          message: error.response.data.msg,
        });
      });
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    let error = '';

    if (this.state.message) {
      error = <div className="alert">{this.state.message}</div>;
    }
    return (
      <div className="form-content-right">
        <form className="form" onSubmit={this.handleSubmit}>
          <h3>
            Create an Account
            <br />
            Please fill the details to register!
            <br />
            <br />
            <br />
          </h3>
          {error}
          <div className="form-inputs">
            <input
              className="form-input"
              type="text"
              name="username"
              placeholder="Enter your Username"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-inputs">
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-inputs">
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-inputs">
            <input
              className="form-input"
              type="password"
              name="passwordCheck"
              placeholder="Confirm your password"
              onChange={this.handleInputChange}
            />
          </div>
          <button className="btn1" type="submit" value="register">
            Sign Up
          </button>
          <span className="login">
            Already have an account? Login <Link to="/login">here</Link>
          </span>
        </form>
      </div>
    );
  }
}
