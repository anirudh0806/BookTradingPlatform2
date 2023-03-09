import react, { Component, useEffect, useReducer, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

import './search.css';

export default function Search(props) {
  const cookies = new Cookies();

  const [data, setData] = useState([]);
  const [cart, setCart] = useState({});
  const [isLoaded, setLoaded] = useState(false);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    fetch('http://localhost:5000/users/search?email=' + cookies.get('email'))
      .then((res) => res.json())
      .then((json) => {
        setData(json.a);
        setCart(json.user.cart);
        setLoaded(true);
      });
  });

  function handleClick(e) {
    const id = e.currentTarget.id;
    const data1 = {
      id: id,
    };
    var result = window.confirm('Are you sure you want to buy the book?');
    if (result) {
      Axios.post('http://localhost:5000/users/delete', data1).then((res) => {
        alert('Purchase Successful');
      });
    }
  }
  function handleCart(e) {
    const id = e.currentTarget.id;
    const data = {
      id: id,
      cart: cart,
      email: cookies.get('email'),
    };
    var result = window.confirm('Are you sure you want to buy the book?');
    if (result) {
      Axios.post('http://localhost:5000/users/add', data).then((res) => {
        console.log(res);
        forceUpdate();
        alert(res.data.message);
      });
    }
  }
  return isLoaded ? (
    <div className="whole">
      <div className="text-center">
        <Link to="/profile" className=" float-left btn btn-danger    mx-5 px-5">
          {' '}
          Back{' '}
        </Link>
        <b className="text-center title m-auto">LIBRARY</b>
        <p></p>
      </div>
      <ul>
        <div>
          {data.map((item) => (
            <div key={item._id}>
              <li className="main1">
                <br />
                <p className="details">
                  BookName : <b>{item.bookName}</b>{' '}
                </p>
                <p className="details">
                  Author : <b>{item.author}</b>
                </p>
                <p className="details">
                  Email : <b>{item.email}</b>
                </p>
                <p className="details">
                  Phone : <b>{item.phoneno}</b>
                </p>
                <button
                  className="details_btn"
                  id={item._id}
                  onClick={handleClick}>
                  {' '}
                  BUY{' '}
                </button>
                <button
                  className="details_btn"
                  id={item._id}
                  onClick={handleCart}>
                  {' '}
                  Add to cart{' '}
                </button>
                <br />
              </li>
              <br />
            </div>
          ))}
          <br />
        </div>
      </ul>
    </div>
  ) : (
    <div>Loading</div>
  );
}
