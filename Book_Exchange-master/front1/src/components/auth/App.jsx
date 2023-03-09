import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Link } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      bookname: '',
      username: '',
      email: '',
      phoneno: '',
    };
    this.changeBookName = this.changeBookName.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePhoneno = this.changePhoneno.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  changeBookName(event) {
    this.setState({
      bookname: event.target.value,
    });
  }
  changeUsername(event) {
    this.setState({
      username: event.target.value,
    });
  }
  changeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }
  changePhoneno(event) {
    this.setState({
      phoneno: event.target.value,
    });
  }
  componentDidUpdate() {
    console.log(this.props.getProps());
  }
  onSubmit(event) {
    event.preventDefault();
    const registered = {
      bookName: this.state.bookname,
      username: this.state.username,
      email: this.state.email,
      phoneno: this.state.phoneno,
    };

    axios
      .post('http://localhost:5000/users/profile', registered)
      .then((response) => console.log(response.data));
    alert('Book Added');
    this.setState({
      bookname: '',
      username: '',
      email: '',
      phoneno: '',
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div>
            <br />
            <br />
            <form className="form23" onSubmit={this.onSubmit}>
              <input
                type="text"
                required
                placeholder="Book"
                onChange={this.changeBookName}
                value={this.state.bookname}
                className="form-control form-group"
              />
              <input
                type="text"
                required
                placeholder="Author"
                onChange={this.changeUsername}
                value={this.state.username}
                className="form-control form-group"
              />
              <input
                type="email"
                required
                placeholder="Email"
                onChange={this.changeEmail}
                value={this.state.email}
                className="form-control form-group"
              />
              <input
                type="text"
                required
                pattern="^\d{10}$"
                placeholder="Phone Number (10 digits)"
                onChange={this.changePhoneno}
                value={this.state.phoneno}
                className="form-control form-group"
              />
              <div className="d-flex justify-content-between">
                <input
                  type="submit"
                  className="  btn btn-outline-primary px-5"
                  value="Sell"
                />
                <Link to="/search" className=" btn btn-outline-primary px-5">
                  Library
                </Link>
                <Link to="/">
                  <button
                    value="Sign Out"
                    onClick={(e) => e.preventDefault()}
                    className="btn btn-outline-primary px-5">
                    Sign Out
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
